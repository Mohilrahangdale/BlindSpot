import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  TrendingDown,
  TrendingUp,
  Eye
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface PreMortemProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const PreMortem: React.FC<PreMortemProps> = ({ analysis, onNavigate }) => {
  const { failureScenario, successScenario } = analysis.preMortem;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Temporal Simulation
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            PRE-MORTEM &amp; PRE-PARADE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate the extreme prospective future before committing resources. Balancing prospective failure against required conditions for flourishing.
          </p>
        </div>

        <button
          onClick={() => onNavigate('opportunity-cost')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Opportunity Cost</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Two Balanced Columns: Failure vs Success */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: IMAGINE IT WENT WRONG */}
        <div className="p-7 rounded-3xl bg-[#14121a]/90 border border-rose-500/30 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
            <TrendingDown className="w-4 h-4" />
            PROSPECTIVE FAILURE SCENARIO
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            IMAGINE IT WENT WRONG
          </h2>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs sm:text-sm text-rose-100 italic leading-relaxed">
            &ldquo;You chose this path six months ago. It didn&apos;t work out. What might have caused it?&rdquo;
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2">
              {failureScenario.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {failureScenario.description}
            </p>
          </div>

          {/* Causes */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold">
              PLAUSIBLE ROOT CAUSES
            </div>
            {failureScenario.causes.map((cause, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <span className="font-mono text-rose-400 text-[10px] mt-0.5 font-bold">
                  ✕
                </span>
                <span>{cause}</span>
              </div>
            ))}
          </div>

          {/* Early Warning Signs */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-amber-400" />
              EARLY WARNING SIGNS TO WATCH FOR
            </div>
            {failureScenario.earlyWarningSigns.map((sign, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-amber-950/10 border border-amber-500/20 text-xs text-amber-200"
              >
                {sign}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: IMAGINE IT WENT RIGHT */}
        <div className="p-7 rounded-3xl bg-[#0f171c]/90 border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            <TrendingUp className="w-4 h-4" />
            PROSPECTIVE SUCCESS PROTOCOL
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            IMAGINE IT WENT RIGHT
          </h2>

          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-emerald-100 italic leading-relaxed">
            &ldquo;What would need to happen for this decision to become a truly great decision?&rdquo;
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2">
              {successScenario.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {successScenario.description}
            </p>
          </div>

          {/* Required Conditions */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
              MANDATORY PREREQUISITE CONDITIONS
            </div>
            {successScenario.requiredConditions.map((cond, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{cond}</span>
              </div>
            ))}
          </div>

          {/* Amplifying Actions */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
              ACTIONS THAT AMPLIFY PROBABILITY OF EXCELLENCE
            </div>
            {successScenario.amplifyingActions.map((action, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-cyan-950/10 border border-cyan-500/20 text-xs text-cyan-200"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
