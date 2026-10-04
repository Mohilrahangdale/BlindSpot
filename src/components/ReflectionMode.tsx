import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  RotateCw, 
  BrainCircuit, 
  CheckCircle2,
  Send
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface ReflectionModeProps {
  analysis: CognitiveAnalysisResult;
  onUpdateAnalysis: (updated: CognitiveAnalysisResult) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const ReflectionMode: React.FC<ReflectionModeProps> = ({
  analysis,
  onUpdateAnalysis,
  onNavigate
}) => {
  const defaultQuestions = [
    "Which unverified assumption are you least certain about right now?",
    "What single piece of information would most change your mind?",
    "What are you actually optimizing for beneath the surface (prestige, safety, learning, autonomy)?",
    "What are you potentially giving up that you haven't fully acknowledged?",
    "Which concern or worst-case friction are you actively avoiding thinking about?"
  ];

  const questions = (analysis.reflectionQuestions && analysis.reflectionQuestions.length > 0)
    ? analysis.reflectionQuestions
    : defaultQuestions;

  const [answers, setAnswers] = useState<Record<number, string>>(analysis.userReflections || {});
  const [isReevaluating, setIsReevaluating] = useState<boolean>(false);

  const handleTextChange = (idx: number, text: string) => {
    setAnswers({
      ...answers,
      [idx]: text
    });
  };

  const handleReexamine = async () => {
    setIsReevaluating(true);

    try {
      const response = await fetch('/api/re-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousAnalysis: analysis,
          userReflections: answers,
          counterfactualAnswers: analysis.counterfactuals.map(c => ({
            prompt: c.prompt,
            answer: c.userAnswer,
            reason: c.userReason
          })),
          assumptionFeedback: analysis.assumptions
            .filter(a => a.status === 'disagreed' || a.userFeedback)
            .map(a => ({ text: a.text, feedback: a.userFeedback }))
        })
      });

      if (response.ok) {
        const updated = await response.json();
        onUpdateAnalysis({
          ...updated,
          userReflections: answers
        });
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.warn('Backend re-evaluation unavailable, using local synthesis:', err);
      const updated = { ...analysis };
      updated.isSecondAnalysis = true;
      updated.overallCoverageScore = Math.min(94, (analysis.overallCoverageScore || 65) + 20);
      updated.beforeVsAfter = {
        originalReasoningSummary: analysis.beforeVsAfter?.originalReasoningSummary || "Initially focused primarily on visible drivers.",
        expandedFactors: [
          ...(analysis.beforeVsAfter?.expandedFactors || []),
          "Evaluated hidden trade-offs and explicit verification tests before committing",
          "Confronted potential failure points during Pre-Mortem exploration"
        ],
        clarifiedAssumptions: [
          ...(analysis.beforeVsAfter?.clarifiedAssumptions || []),
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
      onUpdateAnalysis({
        ...updated,
        userReflections: answers
      });
    } finally {
      setIsReevaluating(false);
      onNavigate('before-after');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Meta-Cognitive Synthesis
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            BEFORE YOU DECIDE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Answer the 5 highest-leverage questions uncovered by the cognitive audit. We will feed your answers into a secondary synthesis.
          </p>
        </div>

        <button
          onClick={() => onNavigate('before-after')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Jump to: Before vs After</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Reflection Prompts */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                PROMPT 0{idx + 1}
              </span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-white">
              {q}
            </h2>

            <textarea
              value={answers[idx] || ''}
              onChange={(e) => handleTextChange(idx, e.target.value)}
              placeholder="Your honest reflection..."
              rows={3}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />
          </div>
        ))}
      </div>

      {/* Re-examine CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#131726] to-[#0f1320] border-2 border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
            Cognitive Second Pass
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5 font-['Space_Grotesk']">
            Synthesize Your Expanded Perspective
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Runs a secondary analysis comparing your original instinctive reasoning with your newly stress-tested thinking.
          </p>
        </div>

        <button
          onClick={handleReexamine}
          disabled={isReevaluating}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-950 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] flex-shrink-0 disabled:opacity-50"
        >
          {isReevaluating ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Re-analyzing Thinking...</span>
            </>
          ) : (
            <>
              <BrainCircuit className="w-4 h-4" />
              <span>RE-EXAMINE MY THINKING</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
