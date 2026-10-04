import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INTERNSHIP_DEMO_RESULT } from './src/data/demoData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI SDK on server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

const SYSTEM_INSTRUCTION = `
You are THE BLIND SPOT — an AI Cognitive Mirror and Personal Cognitive Laboratory.
Your purpose is to examine the user's reasoning behind an important decision and reveal blind spots, unstated assumptions, logic friction, missing information, trade-offs, opportunity costs, and critical unanswered questions.

CRITICAL CONSTRAINTS & NEUTRALITY DIRECTIVES:
1. NEVER MAKE THE DECISION FOR THE USER.
2. NEVER output directive advice: Never say "You should choose X", "Definitely do X", "Don't do X", "It is best to X".
3. ALWAYS use neutral, respectful, exploratory cognitive phrasing:
   - "You may want to consider..."
   - "Your reasoning appears to assume..."
   - "One factor that may be missing is..."
   - "A question worth exploring is..."
4. Never claim psychological certainty, manipulate, or pretend to predict the future.
5. All insights must clearly carry trust labels:
   - "FACT FROM YOU" (explicitly provided by the user)
   - "INFERENCE" (deduced from what they said)
   - "POSSIBILITY" (plausible risk, scenario, or external factor)
   - "QUESTION" (prompt to stimulate deeper critical thinking)
6. Ensure every single dimension of thinking (Financial, Career, Time, Risk, Emotional, Social, Long-term, Opportunity Cost, Values, Reversibility) is evaluated objectively.
7. Return strictly valid JSON adhering to the specified schema.
`;

app.post('/api/analyze-decision', async (req: Request, res: Response) => {
  try {
    const { decision, reasoning, optionalContext } = req.body;

    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return res.status(400).json({ error: 'Please provide a decision to examine.' });
    }

    // Check if user is testing the default internship demo or similar
    const isInternshipPrompt = 
      decision.toLowerCase().includes('internship') || 
      (reasoning && reasoning.toLowerCase().includes('internship'));

    if (!process.env.GEMINI_API_KEY || !ai) {
      console.warn('GEMINI_API_KEY not configured or client missing, generating fallback cognitive analysis.');
      if (isInternshipPrompt) {
        return res.json({
          ...INTERNSHIP_DEMO_RESULT,
          id: `analysis-${Date.now()}`,
          timestamp: Date.now(),
          decision,
          currentReasoning: reasoning || INTERNSHIP_DEMO_RESULT.currentReasoning,
        });
      }
      // Return a tailored synthesized structure for custom prompts if no API key
      return res.json(createSynthesizedFallback(decision, reasoning, optionalContext));
    }

    const promptText = `
User Decision: "${decision}"
User Current Reasoning: "${reasoning || 'No specific reasoning elaborated yet.'}"
Additional Context:
- Goals: ${optionalContext?.goals || 'Not provided'}
- Constraints: ${optionalContext?.constraints || 'Not provided'}
- What matters most: ${optionalContext?.mattersMost || 'Not provided'}
- Fears / Worries: ${optionalContext?.fears || 'Not provided'}
- Knowns: ${optionalContext?.knowns || 'Not provided'}
- Unknowns: ${optionalContext?.unknowns || 'Not provided'}
- Affected People: ${optionalContext?.affectedPeople || 'Not provided'}
- Time Horizon: ${optionalContext?.timeHorizon || 'Not provided'}

Perform a comprehensive cognitive laboratory breakdown of the user's reasoning.
Respond ONLY with a JSON object with this exact shape:
{
  "summary": "2-3 sentence neutral overview of what their reasoning emphasizes and where the chief blind spot or unexamined tension lies.",
  "overallCoverageScore": 55, // integer 0-100 indicating breadth of dimensions considered
  "coverage": [
    { "id": "financial", "name": "Financial", "explored": boolean, "score": number, "note": string },
    { "id": "career", "name": "Career Growth", "explored": boolean, "score": number, "note": string },
    { "id": "time", "name": "Time & Schedule", "explored": boolean, "score": number, "note": string },
    { "id": "risk", "name": "Risk Management", "explored": boolean, "score": number, "note": string },
    { "id": "values", "name": "Core Values", "explored": boolean, "score": number, "note": string },
    { "id": "longTerm", "name": "Long-term Horizon", "explored": boolean, "score": number, "note": string },
    { "id": "opportunityCost", "name": "Opportunity Cost", "explored": boolean, "score": number, "note": string },
    { "id": "reversibility", "name": "Reversibility", "explored": boolean, "score": number, "note": string },
    { "id": "social", "name": "People & Relationships", "explored": boolean, "score": number, "note": string },
    { "id": "emotional", "name": "Emotional & Energy", "explored": boolean, "score": number, "note": string }
  ],
  "drivers": [
    { "id": "dr-1", "factor": string, "influence": "High" | "Medium" | "Low", "trustLabel": "FACT FROM YOU" | "INFERENCE", "detail": string }
  ],
  "notDiscussed": [
    { "id": "nd-1", "factor": string, "whyItMatters": string, "suggestedQuestion": string, "trustLabel": "POSSIBILITY" | "QUESTION" }
  ],
  "assumptions": [
    { "id": "as-1", "text": string, "whyItMatters": string, "howToVerify": string, "ifWrongImpact": string, "trustLabel": "INFERENCE" | "POSSIBILITY" }
  ],
  "inferredValues": [
    { "id": "iv-1", "value": string, "explanation": string, "trustLabel": "INFERENCE" }
  ],
  "radarDimensions": [
    { "id": "financial", "name": "Financial", "dimension": "Financial", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "career", "name": "Career Growth", "dimension": "Career", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "time", "name": "Time & Schedule", "dimension": "Time", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "risk", "name": "Risk Management", "dimension": "Risk", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "emotional", "name": "Emotional & Energy", "dimension": "Emotional", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "social", "name": "Social & Community", "dimension": "Social", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "longTerm", "name": "Long-term Horizon", "dimension": "Long-term", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "opportunityCost", "name": "Opportunity Cost", "dimension": "Opportunity Cost", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "values", "name": "Core Values", "dimension": "Values", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string },
    { "id": "reversibility", "name": "Reversibility", "dimension": "Reversibility", "exploredLevel": number, "whyItMatters": string, "whatYouConsidered": string, "whatMayBeMissing": string, "questionToExplore": string }
  ],
  "logicFrictions": [
    { "id": "lf-1", "statedValue": string, "actualEmphasis": string, "tensionExplanation": string, "neutralQuestion": string, "trustLabel": "INFERENCE" }
  ],
  "informationGaps": {
    "known": [string, string],
    "uncertain": [string, string],
    "assumed": [string, string],
    "missing": [string, string],
    "highestValueUnknown": { "whatToFindOut": string, "howToVerify": string, "whyItMatters": string }
  },
  "perspectives": [
    { "id": "p-1", "role": "Future Me", "icon": "UserCheck", "tagline": string, "perspectiveSummary": string, "questions": [string, string], "simulationDisclaimer": "Simulated viewpoint" },
    { "id": "p-2", "role": "Mentor", "icon": "GraduationCap", "tagline": string, "perspectiveSummary": string, "questions": [string, string], "simulationDisclaimer": "Simulated viewpoint" },
    { "id": "p-3", "role": "Recruiter", "icon": "Briefcase", "tagline": string, "perspectiveSummary": string, "questions": [string, string], "simulationDisclaimer": "Simulated viewpoint" },
    { "id": "p-4", "role": "Neutral Skeptic", "icon": "ShieldAlert", "tagline": string, "perspectiveSummary": string, "questions": [string, string], "simulationDisclaimer": "Simulated viewpoint" },
    { "id": "p-5", "role": "Family / Close Support", "icon": "HeartHandshake", "tagline": string, "perspectiveSummary": string, "questions": [string, string], "simulationDisclaimer": "Simulated viewpoint" }
  ],
  "counterfactuals": [
    { "id": "cf-1", "alteredFactor": string, "prompt": string, "whyThisTestsReasoning": string }
  ],
  "whatWouldChangeYourMind": [
    { "id": "cm-1", "information": string, "whyItMatters": string, "howToVerify": string, "possibleImpact": string, "status": "UNKNOWN" }
  ],
  "preMortem": {
    "failureScenario": { "title": string, "description": string, "causes": [string, string, string], "earlyWarningSigns": [string, string, string] },
    "successScenario": { "title": string, "description": string, "requiredConditions": [string, string, string], "amplifyingActions": [string, string] }
  },
  "opportunityCosts": [
    { "id": "oc-1", "category": "Time" | "Money" | "Learning" | "Alternative Opportunities" | "Flexibility" | "Relationships" | "Future Options", "whatYouGiveUp": string, "tradeoffExplanation": string, "trustLabel": "POSSIBILITY" }
  ],
  "experiments": [
    { "id": "ex-1", "testedAssumption": string, "smallTest": string, "whatYouLearn": string, "whatItCouldChange": string }
  ],
  "reflectionQuestions": [string, string, string, string, string],
  "beforeVsAfter": {
    "originalReasoningSummary": string,
    "expandedFactors": [string, string, string],
    "clarifiedAssumptions": [string, string, string],
    "remainingUncertainties": [string, string],
    "unansweredQuestions": [string, string]
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const rawText = response.text || '';
    let parsedData: any;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', parseErr, rawText);
      parsedData = createSynthesizedFallback(decision, reasoning, optionalContext);
    }

    const result = {
      id: `analysis-${Date.now()}`,
      timestamp: Date.now(),
      decision,
      currentReasoning: reasoning,
      optionalContext,
      ...parsedData,
    };

    return res.json(result);
  } catch (error: any) {
    console.error('Error in /api/analyze-decision:', error);
    // If Gemini API fails, provide graceful fallback
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

// Helper for fallback generation
function createSynthesizedFallback(decision: string, reasoning: string, context?: any) {
  return {
    id: `syn-${Date.now()}`,
    timestamp: Date.now(),
    decision,
    currentReasoning: reasoning,
    optionalContext: context,
    summary: `Your reasoning appears anchored around immediate feasibility and prominent advantages. A deeper look reveals unstated assumptions regarding workload sustainability and alternative opportunity costs that may deserve explicit verification.`,
    overallCoverageScore: 62,
    coverage: [
      { id: "financial", name: "Financial", explored: true, score: 75, note: "Financial terms or costs identified in reasoning." },
      { id: "career", name: "Career Growth", explored: true, score: 70, note: "Direct skills and signaling examined." },
      { id: "time", name: "Time & Schedule", explored: true, score: 60, note: "Daily schedule noted, but long-term stamina unmeasured." },
      { id: "risk", name: "Risk Management", explored: false, score: 35, note: "Downside scenarios remain largely unarticulated." },
      { id: "values", name: "Core Values", explored: true, score: 65, note: "Underlying ambitions are partially visible." },
      { id: "longTerm", name: "Long-term Horizon", explored: false, score: 40, note: "Multi-year trajectory is not directly mapped." },
      { id: "opportunityCost", name: "Opportunity Cost", explored: false, score: 30, note: "Foregone paths have not been explicitly itemized." },
      { id: "reversibility", name: "Reversibility", explored: false, score: 45, note: "Ease of changing direction midway requires checking." },
      { id: "social", name: "People & Relationships", explored: false, score: 40, note: "Impact on core network and collaborators unaddressed." },
      { id: "emotional", name: "Emotional & Energy", explored: false, score: 35, note: "Psychological resilience under stress not factored." }
    ],
    drivers: [
      {
        id: "dr-1",
        factor: "Immediate tangible upside",
        influence: "High",
        trustLabel: "FACT FROM YOU",
        detail: "The primary visible benefit driving your preference."
      },
      {
        id: "dr-2",
        factor: "Convenience or familiar conditions",
        influence: "Medium",
        trustLabel: "INFERENCE",
        detail: "Low friction in the short run appears to make this path feel safest."
      }
    ],
    notDiscussed: [
      {
        id: "nd-1",
        factor: "Downside contingency planning",
        whyItMatters: "If unexpected setbacks arise, having no pre-established threshold for aborting or pivoting multiplies risk.",
        suggestedQuestion: "What specific indicator would tell you within the first 60 days that this path is not working?",
        trustLabel: "QUESTION"
      },
      {
        id: "nd-2",
        factor: "Opportunity cost of time",
        whyItMatters: "Committing energy here means other high-leverage possibilities cannot be pursued.",
        suggestedQuestion: "What is the single most valuable alternative project you are trading away for this?",
        trustLabel: "QUESTION"
      }
    ],
    assumptions: [
      {
        id: "as-1",
        text: "The current conditions and promises will remain stable throughout the entire duration.",
        whyItMatters: "If leadership, terms, or expectations shift, your baseline calculations change.",
        howToVerify: "Request explicit written confirmation of key expectations before committing.",
        ifWrongImpact: "You may find yourself locked into an unsupportive or modified arrangement.",
        trustLabel: "INFERENCE"
      },
      {
        id: "as-2",
        text: "Your current energy and motivation levels will sustain without compounding fatigue.",
        whyItMatters: "Sustained high-effort commitments often hit unforeseen friction around month three.",
        howToVerify: "Conduct a trial week simulating the full schedule demand.",
        ifWrongImpact: "Risk of burnout impacting other life priorities.",
        trustLabel: "POSSIBILITY"
      }
    ],
    inferredValues: [
      {
        id: "iv-1",
        value: "Tangible Progress over Theoretical Safety",
        explanation: "You prioritize taking action and creating real-world momentum.",
        trustLabel: "INFERENCE"
      }
    ],
    radarDimensions: [
      { id: "financial", name: "Financial", dimension: "Financial", exploredLevel: 75, whyItMatters: "Ensures economic viability and clear upside.", whatYouConsidered: "Immediate costs or income.", whatMayBeMissing: "Hidden secondary costs or tax implications.", questionToExplore: "Does this decision yield a positive net financial return when factoring all second-order expenses?" },
      { id: "career", name: "Career Growth", dimension: "Career", exploredLevel: 70, whyItMatters: "Accelerates future leverage and competency.", whatYouConsidered: "Direct experience gain.", whatMayBeMissing: "Transferability of skills across other industries.", questionToExplore: "Will this credential stand out strongly to external evaluators two years from now?" },
      { id: "time", name: "Time & Schedule", dimension: "Time", exploredLevel: 60, whyItMatters: "Protects mental capacity and physical recovery.", whatYouConsidered: "Basic weekly hours.", whatMayBeMissing: "Commute fatigue and cognitive recovery time.", questionToExplore: "How many net uninterrupted rest hours will you retain weekly?" },
      { id: "risk", name: "Risk Management", dimension: "Risk", exploredLevel: 35, whyItMatters: "Prevents catastrophic failure modes.", whatYouConsidered: "Optimistic trajectory.", whatMayBeMissing: "Worst-case scenario mitigation.", questionToExplore: "If this completely fails, what is the fastest safe exit route?" },
      { id: "emotional", name: "Emotional & Energy", dimension: "Emotional", exploredLevel: 35, whyItMatters: "Protects long-term psychological wellbeing.", whatYouConsidered: "Enthusiasm.", whatMayBeMissing: "Emotional strain during acute crunch periods.", questionToExplore: "How do you recharge when external pressure remains constant?" },
      { id: "social", name: "Social & Community", dimension: "Social", exploredLevel: 40, whyItMatters: "Preserves key relationships.", whatYouConsidered: "Individual focus.", whatMayBeMissing: "Time with family and key supporters.", questionToExplore: "Will the people who care about you feel neglected during this phase?" },
      { id: "longTerm", name: "Long-term Horizon", dimension: "Long-term", exploredLevel: 40, whyItMatters: "Connects present steps to distant horizons.", whatYouConsidered: "Immediate year ahead.", whatMayBeMissing: "Compound effects 3-5 years out.", questionToExplore: "Does this move open new doors in 5 years, or narrow your positioning?" },
      { id: "opportunityCost", name: "Opportunity Cost", dimension: "Opportunity Cost", exploredLevel: 30, whyItMatters: "Reveals what is forfeited by saying yes.", whatYouConsidered: "The chosen option.", whatMayBeMissing: "Other competing paths.", questionToExplore: "If this option was suddenly cancelled, what would you enthusiastically do instead?" },
      { id: "values", name: "Core Values", dimension: "Values", exploredLevel: 65, whyItMatters: "Aligns action with personal integrity.", whatYouConsidered: "Desire for achievement.", whatMayBeMissing: "Internal conflicts between ambition and peace.", questionToExplore: "Does this choice represent what you genuinely care about, or what looks impressive?" },
      { id: "reversibility", name: "Reversibility", dimension: "Reversibility", exploredLevel: 45, whyItMatters: "Two-way door decisions allow rapid iteration.", whatYouConsidered: "Commitment.", whatMayBeMissing: "Early exit clauses.", questionToExplore: "Can you structure an initial 30-day review checkpoint?" }
    ],
    logicFrictions: [
      {
        id: "lf-1",
        statedValue: "Desire for high achievement and depth",
        actualEmphasis: "Focus on convenient or immediate factors",
        tensionExplanation: "Convenience is often inversely correlated with high compounding growth.",
        neutralQuestion: "If this path required twice the effort, would you still find it just as compelling?",
        trustLabel: "INFERENCE"
      }
    ],
    informationGaps: {
      known: ["Primary scope of the decision", "Immediate personal motivation", "Basic logistical factors"],
      uncertain: ["Realistic long-term day-to-day conditions", "Support system responsiveness", "Net energy balance"],
      assumed: ["The arrangement will run as smoothly in reality as described", "External factors will remain cooperative"],
      missing: ["Unfiltered feedback from people who walked this path recently", "Clear reversibility safeguards"],
      highestValueUnknown: {
        whatToFindOut: "The actual day-to-day reality from an independent third party.",
        howToVerify: "Reach out to 2 people who made this exact choice last year and ask for their top unexpected realization.",
        whyItMatters: "Direct experiential data cuts through marketing and optimism bias."
      }
    },
    perspectives: [
      { id: "p-1", role: "Future Me (3 Years Ahead)", icon: "UserCheck", tagline: "Evaluating compound life trajectory", perspectiveSummary: "Looking back, will you view this as a pivotal catalyst or a minor detour?", questions: ["Did this choice give you lasting leverage?", "Did you sacrifice something irreplaceable?"], simulationDisclaimer: "Simulated reflective perspective." },
      { id: "p-2", role: "Pragmatic Mentor", icon: "GraduationCap", tagline: "Assessing fundamentals and skill mastery", perspectiveSummary: "Focuses on whether you are learning durable craft or chasing surface prestige.", questions: ["What exact skills are compounding each month?", "Who is holding your standards high?"], simulationDisclaimer: "Simulated mentor perspective." },
      { id: "p-3", role: "Constructive Skeptic", icon: "ShieldAlert", tagline: "Stress-testing your optimistic narrative", perspectiveSummary: "Asks what happens when things go wrong.", questions: ["What if the primary benefit fails to materialize?", "What is your fallback if you need to exit early?"], simulationDisclaimer: "Simulated adversarial perspective." }
    ],
    counterfactuals: [
      { id: "cf-1", alteredFactor: "The primary visible benefit was removed", prompt: "What if the biggest immediate benefit suddenly disappeared?", whyThisTestsReasoning: "Reveals whether your interest is sustained by intrinsic growth or merely the surface reward." },
      { id: "cf-2", alteredFactor: "The commitment duration was cut in half", prompt: "What if the timeframe was reduced by 50%?", whyThisTestsReasoning: "Tests whether you actually need the full duration to achieve the core objective." }
    ],
    whatWouldChangeYourMind: [
      { id: "cm-1", information: "Evidence that past participants experienced chronic overwork or low support.", whyItMatters: "Directly counters optimistic assumptions about culture.", howToVerify: "Conduct 1 confidential alumni chat.", possibleImpact: "Critical - warrants re-evaluating acceptance.", status: "UNKNOWN" },
      { id: "cm-2", information: "A competing opportunity offering higher mentorship with identical upside.", whyItMatters: "Establishes a superior benchmark.", howToVerify: "Explore parallel applications before signing.", possibleImpact: "High - improves negotiation posture.", status: "UNKNOWN" }
    ],
    preMortem: {
      failureScenario: {
        title: "The Unchecked Friction Breakdown",
        description: "Six months in, minor unaddressed frictions compounded into deep fatigue, resulting in diminished performance and regret.",
        causes: ["Relying on verbal assurances instead of documented agreements", "Failing to schedule dedicated recovery periods", "Ignoring early warning signs of overload"],
        earlyWarningSigns: ["Week 3: Struggling to meet secondary obligations", "Week 5: Reluctance to start each working day", "Week 8: Friction with peers or advisors"]
      },
      successScenario: {
        title: "The Intentional Breakthrough",
        description: "Six months in, you extracted maximum skill gains while defending boundaries and maintaining excellent personal wellbeing.",
        requiredConditions: ["Clear boundaries established from day one", "Weekly reflection rituals to inspect learning", "Open communication with key stakeholders"],
        amplifyingActions: ["Document key learnings weekly", "Regularly ask for candid constructive feedback"]
      }
    },
    opportunityCosts: [
      { id: "oc-1", category: "Time", whatYouGiveUp: "Substantial weekly discretionary hours.", tradeoffExplanation: "Cannot be reallocated toward creative projects, family, or health.", trustLabel: "POSSIBILITY" },
      { id: "oc-2", category: "Alternative Opportunities", whatYouGiveUp: "Flexibility to jump onto unforeseen opportunities.", tradeoffExplanation: "Commitment locks you into a fixed operational track.", trustLabel: "POSSIBILITY" }
    ],
    experiments: [
      { id: "ex-1", testedAssumption: "The day-to-day workload is manageable.", smallTest: "Simulate the proposed schedule for 3 consecutive days prior to commitment.", whatYouLearn: "Your true energy reserves under this exact operational tempo.", whatItCouldChange: "Helps you negotiate part-time or flexible arrangements." }
    ],
    reflectionQuestions: [
      "Which assumption are you least certain about right now?",
      "What information would most change your mind if discovered tomorrow?",
      "What are you actually optimizing for — prestige, safety, growth, or convenience?",
      "What are you potentially giving up that you haven't admitted yet?",
      "Which concern are you actively avoiding thinking about?"
    ],
    beforeVsAfter: {
      originalReasoningSummary: "Initially evaluated primarily through immediate visible factors and optimism.",
      expandedFactors: [
        "Unaddressed trade-offs in time and personal recovery.",
        "The necessity of explicit verification tests before signing.",
        "Pre-mortem risk mitigation strategies."
      ],
      clarifiedAssumptions: [
        "Recognized that unverified expectations should be formally checked.",
        "Acknowledged that convenience can sometimes mask hidden costs."
      ],
      remainingUncertainties: [
        "Day-to-day culture and communication dynamics under stress.",
        "Availability of backup alternatives if terms change."
      ],
      unansweredQuestions: [
        "What small test can you execute this week before making the final call?"
      ]
    }
  };
}

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
