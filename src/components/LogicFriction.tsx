import React from 'react';
import { 
  Flame, 
  ArrowRight, 
  Scale, 
  HelpCircle, 
  Sparkles,
  Split,
  MessageSquare
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';
import { TrustBadge } from './TrustBadge';

interface LogicFrictionProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const LogicFriction: React.FC<LogicFrictionProps> = ({ analysis, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Internal Alignment Check
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            LOGIC FRICTION
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Surfacing subtle tensions between your declared priorities and what your reasoning currently emphasizes.
          </p>
        </div>

        <button
          onClick={() => onNavigate('information-gap')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Information Gap Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Logic Tensions List */}
      <div className="space-y-6">
        {analysis.logicFrictions.map((item, idx) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/20">
                TENSION #{idx + 1}
              </span>
              <TrustBadge label={item.trustLabel} />
            </div>

            {/* Tension comparison two sides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stated value */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
                <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-bold mb-1">
                  WHAT YOU SAY YOU VALUE
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  &ldquo;{item.statedValue}&rdquo;
                </div>
              </div>

              {/* Actual emphasis */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-1">
                  WHAT YOUR REASONING EMPHASIZES
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  &ldquo;{item.actualEmphasis}&rdquo;
                </div>
              </div>
            </div>

            {/* The Tension explanation */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                POSSIBLE TENSION
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.tensionExplanation}
              </p>
            </div>

            {/* Constructive Neutral Question */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-[#121622] border border-cyan-500/30">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                QUESTION WORTH EXPLORING
              </div>
              <p className="text-xs sm:text-sm text-cyan-100 font-medium italic">
                &ldquo;{item.neutralQuestion}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
