import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  Check, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Send,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { AssumptionItem, CognitiveAnalysisResult, ViewScreen } from '../types';
import { TrustBadge } from './TrustBadge';

interface AssumptionAuditorProps {
  analysis: CognitiveAnalysisResult;
  onUpdateAnalysis: (updated: CognitiveAnalysisResult) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const AssumptionAuditor: React.FC<AssumptionAuditorProps> = ({
  analysis,
  onUpdateAnalysis,
  onNavigate
}) => {
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const handleSetStatus = (id: string, status: 'relevant' | 'disagreed') => {
    const updatedAssumptions = analysis.assumptions.map(a => {
      if (a.id === id) {
        return { ...a, status };
      }
      return a;
    });

    if (status === 'disagreed') {
      setActiveFeedbackId(id);
    } else {
      setActiveFeedbackId(null);
    }

    onUpdateAnalysis({
      ...analysis,
      assumptions: updatedAssumptions
    });
  };

  const handleSaveFeedback = (id: string) => {
    if (!feedbackText.trim()) return;

    const updatedAssumptions = analysis.assumptions.map(a => {
      if (a.id === id) {
        return { ...a, userFeedback: feedbackText.trim() };
      }
      return a;
    });

    onUpdateAnalysis({
      ...analysis,
      assumptions: updatedAssumptions
    });

    setActiveFeedbackId(null);
    setFeedbackText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            Hypothesis Integrity Audit
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            ASSUMPTION AUDITOR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Decisions break down not because our logic was poor, but because unstated assumptions proved false. Review each hypothesis below.
          </p>
        </div>

        <button
          onClick={() => onNavigate('logic-friction')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Logic Friction</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Assumptions List */}
      <div className="space-y-6">
        {analysis.assumptions.map((item, index) => {
          const isDisagreed = item.status === 'disagreed';
          const isRelevant = item.status === 'relevant';

          return (
            <div
              key={item.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                isDisagreed
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : isRelevant
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-[#121622]/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/20">
                    ASSUMPTION #{index + 1}
                  </span>
                  <TrustBadge label={item.trustLabel} />
                </div>

                {/* Audit Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetStatus(item.id, 'relevant')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isRelevant
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>✓ RELEVANT</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(item.id, 'disagreed')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isDisagreed
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-rose-300 hover:border-rose-500/50'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>✕ I DISAGREE</span>
                  </button>
                </div>
              </div>

              {/* Assumption Statement */}
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                &ldquo;{item.text}&rdquo;
              </h2>

              {/* 3 Detail Blocks */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
                {/* Why it matters */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    WHY IT MATTERS
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>

                {/* How to verify */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">
                    HOW TO VERIFY IT
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.howToVerify}
                  </p>
                </div>

                {/* If it is wrong */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">
                    IF IT IS WRONG...
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.ifWrongImpact}
                  </p>
                </div>
              </div>

              {/* If user clicked Disagree: Feedback input */}
              {activeFeedbackId === item.id && (
                <div className="mt-4 p-4 rounded-2xl bg-[#171b26] border border-rose-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-300 font-semibold">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why do you disagree with this assumption?</span>
                  </div>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us what the AI assumed incorrectly (e.g., 'I already spoke to the team lead and they officially confirmed they will let me attend classes remotely')..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveFeedbackId(null)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveFeedback(item.id)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Submit Refinement</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Render Saved User Feedback */}
              {item.userFeedback && (
                <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30 text-xs flex items-start gap-2">
                  <FileCheck2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase text-indigo-400 font-bold block">
                      Your Refinement Note
                    </span>
                    <p className="text-slate-300 mt-0.5">{item.userFeedback}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
