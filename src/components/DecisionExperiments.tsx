import React from 'react';
import { 
  FlaskConical, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles,
  Lightbulb,
  FileCheck
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface DecisionExperimentsProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const DecisionExperiments: React.FC<DecisionExperimentsProps> = ({
  analysis,
  onNavigate
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5" />
            Empirical Prototyping
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            TEST BEFORE YOU COMMIT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Never bet your career or finances on an assumption when a 48-hour experiment can buy you certainty for pennies.
          </p>
        </div>

        <button
          onClick={() => onNavigate('reflection-mode')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Reflection Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Experiment sequence cards */}
      <div className="space-y-8">
        {analysis.experiments.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20">
                EMPIRICAL PROTOCOL #{idx + 1}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Target: High Leverage Unknown
              </span>
            </div>

            {/* Step 1: ASSUMPTION */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                UNTESTED ASSUMPTION
              </div>
              <p className="text-sm font-semibold text-white">
                &ldquo;{exp.testedAssumption}&rdquo;
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-indigo-400 animate-bounce" />
            </div>

            {/* Step 2: SMALL TEST */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/40">
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                LOW-COST 48-HOUR EXPERIMENT
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {exp.smallTest}
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </div>

            {/* 2 Bottom Outcome Cards: What you learn + What it could change */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                  WHAT YOU LEARN
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {exp.whatYouLearn}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                  WHAT IT COULD CHANGE
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {exp.whatItCouldChange}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
