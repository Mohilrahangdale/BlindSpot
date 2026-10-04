import React from 'react';
import { 
  Eye, 
  HelpCircle, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  HeartHandshake, 
  Compass,
  CheckCircle,
  FileQuestion
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';
import { TrustBadge } from './TrustBadge';

interface ReasoningXRayProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const ReasoningXRay: React.FC<ReasoningXRayProps> = ({ analysis, onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Deconstruction Layer
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            YOUR REASONING — X-RAY
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            A cognitive cross-section separating what was explicitly spoken from unspoken drivers, inferences, and missing considerations.
          </p>
        </div>

        <button
          onClick={() => onNavigate('blind-spot-radar')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Blind Spot Radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Decision Banner Recap */}
      <div className="p-5 rounded-2xl bg-[#11141e]/90 border border-slate-800">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Decision Examined
        </span>
        <div className="text-base font-semibold text-white mt-0.5">
          &ldquo;{analysis.decision}&rdquo;
        </div>
        <div className="text-xs text-slate-400 mt-2 italic leading-relaxed">
          &ldquo;{analysis.currentReasoning}&rdquo;
        </div>
      </div>

      {/* Section 1: WHAT IS DRIVING YOUR DECISION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              WHAT IS DRIVING YOUR DECISION
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Visible anchors identified in your text
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.drivers.map((driver) => (
            <div
              key={driver.id}
              className="p-5 rounded-2xl bg-[#121622]/80 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                    driver.influence === 'High' 
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' 
                      : driver.influence === 'Medium'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {driver.influence} Influence
                  </span>
                  <TrustBadge label={driver.trustLabel} />
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  {driver.factor}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {driver.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: WHAT YOU HAVE NOT DISCUSSED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              WHAT YOU HAVE NOT DISCUSSED
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Potentially missing dimensions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.notDiscussed.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#141824]/70 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider">
                    Unspoken Factor
                  </span>
                  <TrustBadge label={item.trustLabel} />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {item.factor}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FileQuestion className="w-3 h-3" />
                  Question to Explore
                </div>
                <p className="text-xs text-slate-300 italic">
                  &ldquo;{item.suggestedQuestion}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: WHAT YOU APPEAR TO VALUE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              WHAT YOU APPEAR TO VALUE
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Inferred core values beneath the tactical choices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.inferredValues.map((val) => (
            <div
              key={val.id}
              className="p-5 rounded-2xl bg-[#121622]/80 border border-slate-800 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <HeartHandshake className="w-4 h-4 text-cyan-400" />
                <TrustBadge label={val.trustLabel} />
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                {val.value}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {val.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: WHAT YOU MAY BE ASSUMING */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#131726] to-[#121623] border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Next Critical Investigation
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            You have {analysis.assumptions.length} detected assumptions waiting for verification
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Examine unstated premises you take for granted and test what happens to your decision if they turn out to be false.
          </p>
        </div>

        <button
          onClick={() => onNavigate('assumption-auditor')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <span>Audit Assumptions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
