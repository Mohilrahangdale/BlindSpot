import { executeCognitiveAnalysis, createSynthesizedFallback } from '../src/lib/cognitiveEngine';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { decision, reasoning, optionalContext } = body;

    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return res.status(400).json({ error: 'Please provide a decision to examine.' });
    }

    const result = await executeCognitiveAnalysis(decision, reasoning, optionalContext);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('API error in /api/analyze-decision:', error);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { decision, reasoning, optionalContext } = body;
    return res.status(200).json(createSynthesizedFallback(decision || 'Untitled Decision', reasoning || '', optionalContext));
  }
}
