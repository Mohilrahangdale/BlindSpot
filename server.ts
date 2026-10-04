import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { executeCognitiveAnalysis, createSynthesizedFallback, SYSTEM_INSTRUCTION } from './src/lib/cognitiveEngine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

app.post('/api/analyze-decision', async (req: Request, res: Response) => {
  try {
    const { decision, reasoning, optionalContext } = req.body;

    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return res.status(400).json({ error: 'Please provide a decision to examine.' });
    }

    const result = await executeCognitiveAnalysis(decision, reasoning, optionalContext);
    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/analyze-decision:', error);
    const { decision, reasoning, optionalContext } = req.body;
    return res.json(createSynthesizedFallback(decision || 'Untitled Decision', reasoning || '', optionalContext));
  }
});

// Second analysis / Re-evaluate with user reflections and counterfactual responses
app.post('/api/re-evaluate', async (req: Request, res: Response) => {
  try {
    const { previousAnalysis, userReflections, counterfactualAnswers, assumptionFeedback } = req.body;

    if (!previousAnalysis) {
      return res.status(400).json({ error: 'Missing previous analysis data' });
    }

    if (!process.env.GEMINI_API_KEY || !ai) {
      // Offline fallback re-evaluation
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
      return res.json(updated);
    }

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

    return res.json(merged);
  } catch (error) {
    console.error('Error in /api/re-evaluate:', error);
    const updated = { ...req.body.previousAnalysis, isSecondAnalysis: true };
    return res.json(updated);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`The Blind Spot server running on port ${PORT}`);
  });
}

startServer();
