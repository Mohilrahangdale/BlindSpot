import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  ShieldCheck, 
  BookMarked,
  RotateCcw
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface BeforeVsAfterProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
  onSaveToJournal: () => void;
  isSavedInJournal: boolean;
}

export const BeforeVsAfter: React.FC<BeforeVsAfterProps> = ({
  analysis,
  onNavigate,
  onSaveToJournal,
  isSavedInJournal
}) => {
  const { beforeVsAfter } = analysis;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          The Final Mirror
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-['Space_Grotesk']">
          YOUR THINKING, EXPANDED
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Compare your initial instinctive reasoning against the multidimensional perspective you now possess.
        </p>
      </div>

      {/* Side by side comparison: Left Original vs Right Expanded */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* LEFT: ORIGINAL REASONING */}
        <div className="p-7 rounded-3xl bg-[#11141e]/80 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                PHASE 01 · ORIGINAL REASONING
              </span>
              <span className="text-xs font-mono text-slate-400">Baseline Thinking</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                Your Initial Reasoning
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{analysis.currentReasoning}&rdquo;
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                Characteristics of the Original State
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-mono mt-0.5">•</span>
                  <span>Heavily anchored around the most visible immediate advantages (e.g. stipend, 20-min commute).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-mono mt-0.5">•</span>
                  <span>Unstated operational assumptions treated as established facts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-mono mt-0.5">•</span>
                  <span>No explicit contingency plan for worst-case schedule friction or burnout.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-mono mt-0.5">•</span>
                  <span>Opportunity cost of forfeited alternatives remained invisible.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400 text-center">
            {beforeVsAfter?.originalReasoningSummary || "Initially focused primarily on visible drivers without stress-testing unstated assumptions."}
          </div>
        </div>

        {/* RIGHT: AFTER REFLECTION */}
        <div className="p-7 rounded-3xl bg-gradient-to-b from-[#131726] to-[#0f1320] border-2 border-indigo-500/40 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/30">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                PHASE 02 · AFTER REFLECTION
              </span>
              <span className="text-xs font-mono text-indigo-300 font-bold">
                Expanded Framework
              </span>
            </div>

            {/* What new factors appeared */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2">
                WHAT NEW FACTORS APPEARED
              </div>
              <div className="space-y-2">
                {(beforeVsAfter?.expandedFactors || [
                  "Structural schedule collision between work hours and university lecture times.",
                  "Difference between 'fast-moving startup' and structured mentorship availability.",
                  "Opportunity cost of committing 6 full months vs. 3-month summer alternatives."
                ]).map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-100 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Which assumptions became clearer */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
                WHICH ASSUMPTIONS BECAME CLEARER
              </div>
              <div className="space-y-2">
                {(beforeVsAfter?.clarifiedAssumptions || [
                  "Recognized that flexibility cannot be assumed—it must be put into written terms.",
                  "Understood that peer validation from one friend is not an audit of company engineering quality."
                ]).map((asmp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-100 flex items-start gap-2"
                  >
                    <span className="text-emerald-400 font-mono text-[10px] mt-0.5 font-bold">✓</span>
                    <span>{asmp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What remains uncertain */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                WHAT REMAINS UNCERTAIN
              </div>
              <div className="space-y-2">
                {(beforeVsAfter?.remainingUncertainties || [
                  "Actual return offer headcount budget for 2027 grads.",
                  "Team lead willingness to protect learning during sprint crunches."
                ]).map((unc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-100 flex items-start gap-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{unc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-indigo-500/30 flex items-center justify-between text-xs text-indigo-200">
            <span className="font-mono">Coverage: {analysis.overallCoverageScore}%</span>
            <span className="font-semibold text-cyan-300">10 Dimensions Explored</span>
          </div>
        </div>
      </div>

      {/* MEMORABLE FINAL MANIFESTO SCREEN */}
      <section className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#131726] to-[#0c0e14] border-2 border-indigo-500/50 shadow-2xl text-center space-y-8 overflow-hidden">
        {/* Subtle glowing ambient circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-300 font-semibold py-1 px-4 rounded-full bg-indigo-500/20 border border-indigo-500/30">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Decision Sovereignty Guarantee
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
            &ldquo;THE AI DIDN&apos;T MAKE THE DECISION.&rdquo;
          </h2>

          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-200 bg-clip-text text-transparent font-['Space_Grotesk']">
            &ldquo;IT MADE THE THINKING BETTER.&rdquo;
          </h3>

          <div className="pt-4">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              YOU HAVE MORE TO CONSIDER NOW.
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-mono tracking-wider mt-1">
              THE DECISION IS STILL YOURS.
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onSaveToJournal}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isSavedInJournal
                  ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>{isSavedInJournal ? 'Saved to Decision Journal' : 'Save to Decision Journal'}</span>
            </button>

            <button
              onClick={() => onNavigate('thinking-map')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>View Interactive Thinking Map</span>
            </button>

            <button
              onClick={() => onNavigate('command-center')}
              className="px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Back to Command Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
