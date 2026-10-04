import React from 'react';
import { 
  Scale, 
  ArrowRight, 
  Clock, 
  Coins, 
  GraduationCap, 
  GitFork, 
  Sliders, 
  HeartHandshake, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';
import { TrustBadge } from './TrustBadge';

interface OpportunityCostProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const OpportunityCost: React.FC<OpportunityCostProps> = ({ analysis, onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Time': return Clock;
      case 'Money': return Coins;
      case 'Learning': return GraduationCap;
      case 'Alternative Opportunities': return GitFork;
      case 'Flexibility': return Sliders;
      case 'Relationships': return HeartHandshake;
      default: return Compass;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            Trade-off Quantifier
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            THE PATH NOT TAKEN
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Every choice is a silent veto on a dozen alternatives. Make visible what you forfeit so your sacrifice is intentional, not accidental.
          </p>
        </div>

        <button
          onClick={() => onNavigate('experiments')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Decision Experiments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Opportunity cost cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.opportunityCosts.map((item) => {
          const IconComp = getCategoryIcon(item.category);
          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <TrustBadge label={item.trustLabel} />
                </div>

                <div className="mt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-1">
                    POTENTIAL FORFEITURE
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.whatYouGiveUp}
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                    TRADE-OFF MECHANICS
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.tradeoffExplanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
