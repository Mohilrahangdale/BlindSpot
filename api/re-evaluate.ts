import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../src/lib/cognitiveEngine';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const { previousAnalysis, userReflections, counterfactualAnswers, assumptionFeedback } = body;

  if (!previousAnalysis) {
    return res.status(400).json({ error: 'Missing previous analysis data' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const updated = { ...previousAnalysis };
    updated.isSecondAnalysis = true;
    updated.overallCoverageScore = Math.min(94, (previousAnalysis.overallCoverageScore || 65) + 20);
    updated.beforeVsAfter = {
      originalReasoningSummary: previousAnalysis.beforeVsAfter?.originalReasoningSummary || "Initially focused primarily on visible drivers.",
      expandedFactors: [
        ...(previousAnalysis.beforeVsAfter?.expandedFactors || []),
        "Evaluated hidden trade-offs and explicit verification tests before committing",
        "Confronted potential failure points during Pre-Mortem exploration"
      ],
      clarifiedAssumptions: [
        ...(previousAnalysis.beforeVsAfter?.clarifiedAssumptions || []),
        "Addressed user feedback: questioned assumptions that had weak empirical grounding"
      ],
      remainingUncertainties: [
        "Actual team dynamics during peak crisis or sprint delivery periods",
        "Written confirmation on negotiable schedule or compensation terms"
      ],
      unansweredQuestions: [
        "What is the single low-cost experiment you will execute within the next 48 hours?"
      ]
    };
    return res.status(200).json(updated);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const reEvalPrompt = `
You previously analyzed this decision: "${previousAnalysis.decision}".
Initial Reasoning: "${previousAnalysis.currentReasoning}"

The user has now engaged in cognitive reflection:
- Reflection Answers: ${JSON.stringify(userReflections || {})}
- Counterfactual responses: ${JSON.stringify(counterfactualAnswers || [])}
- Assumption feedback: ${JSON.stringify(assumptionFeedback || [])}

Update the cognitive analysis to reflect their EXPANDED thinking.
Increase their thinking coverage score where appropriate.
Update:
1. beforeVsAfter (What changed? What new factors appeared? Which assumptions became clearer? What remains uncertain? What questions remain?)
2. summary
3. coverage scores
4. any refined questions.

Remember: NEVER make the decision. Maintain the AI Cognitive Mirror neutrality.
Respond with the updated JSON structure.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: reEvalPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const merged = {
      ...previousAnalysis,
      ...parsed,
      isSecondAnalysis: true,
      timestamp: Date.now(),
    };

    return res.status(200).json(merged);
  } catch (error) {
    console.error('Error in /api/re-evaluate:', error);
    return res.status(200).json({ ...previousAnalysis, isSecondAnalysis: true });
  }
}
