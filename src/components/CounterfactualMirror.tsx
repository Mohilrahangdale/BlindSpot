import React, { useState } from 'react';
import { 
  GitFork, 
  ArrowRight, 
  RotateCw, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { CognitiveAnalysisResult, CounterfactualItem, ViewScreen } from '../types';

interface CounterfactualMirrorProps {
  analysis: CognitiveAnalysisResult;
  onUpdateAnalysis: (updated: CognitiveAnalysisResult) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const CounterfactualMirror: React.FC<CounterfactualMirrorProps> = ({
  analysis,
  onUpdateAnalysis,
  onNavigate
}) => {
  const [activeReasonId, setActiveReasonId] = useState<string | null>(null);
  const [reasonInputs, setReasonInputs] = useState<Record<string, string>>({});

  const handleSelectAnswer = (id: string, ans: 'YES' | 'NO' | 'NOT_SURE') => {
    const updated = analysis.counterfactuals.map(c => {
      if (c.id === id) {
        return { ...c, userAnswer: ans };
      }
      return c;
    });

    setActiveReasonId(id);

    onUpdateAnalysis({
      ...analysis,
      counterfactuals: updated
    });
  };

  const handleSaveReason = (id: string) => {
    const reason = reasonInputs[id] || '';
    if (!reason.trim()) return;

    const updated = analysis.counterfactuals.map(c => {
      if (c.id === id) {
        return { ...c, userReason: reason.trim() };
      }
      return c;
    });

    onUpdateAnalysis({
      ...analysis,
      counterfactuals: updated
    });

    setActiveReasonId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5" />
            Counterfactual Perturbation
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            FLIP THE STORY
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Stress-testing the stability of your reasoning by inverting foundational assumptions. If changing a variable breaks your preference, that variable is doing the heavy lifting.
          </p>
        </div>

        <button
          onClick={() => onNavigate('change-mind')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: What Would Change Mind</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Counterfactual cards */}
      <div className="space-y-6">
        {analysis.counterfactuals.map((cf, idx) => {
          const answer = cf.userAnswer;
          return (
            <div
              key={cf.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  SCENARIO FLIP #{idx + 1}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {cf.alteredFactor}
                </span>
              </div>

              {/* The Inverted Prompt */}
              <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
                &ldquo;{cf.prompt}&rdquo;
              </h2>

              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300 font-mono">Why this tests reasoning:</span> {cf.whyThisTestsReasoning}
              </p>

              {/* User Interactive Response buttons */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  WOULD YOUR REASONING CHANGE?
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {(['YES', 'NO', 'NOT_SURE'] as const).map((opt) => {
                    const isSelected = answer === opt;
                    const labels = {
                      YES: 'YES, my choice changes',
                      NO: 'NO, I still hold the same path',
                      NOT_SURE: 'NOT SURE, I need to pause'
                    };
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectAnswer(cf.id, opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-950'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                        }`}
                      >
                        {labels[opt]}
                      </button>
                    );
                  })}
                </div>

                {/* Inline Why response */}
                {activeReasonId === cf.id && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#171b26] border border-indigo-500/30 space-y-3">
                    <div className="text-xs font-mono text-indigo-300 font-semibold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Why would your reasoning {answer === 'YES' ? 'change' : answer === 'NO' ? 'remain unchanged' : 'be uncertain'}?</span>
                    </div>
                    <input
                      type="text"
                      value={reasonInputs[cf.id] || ''}
                      onChange={(e) => setReasonInputs({ ...reasonInputs, [cf.id]: e.target.value })}
                      placeholder="Briefly state your underlying reason..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveReasonId(null)}
                        className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => handleSaveReason(cf.id)}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Save Reason
                      </button>
                    </div>
                  </div>
                )}

                {/* Show saved explanation */}
                {cf.userReason && (
                  <div className="mt-3 text-xs text-indigo-200 bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-500/20 italic">
                    &ldquo;{cf.userReason}&rdquo;
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
