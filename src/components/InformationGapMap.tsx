import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  CloudAlert, 
  AlertOctagon, 
  Sparkles,
  Info
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface InformationGapMapProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const InformationGapMap: React.FC<InformationGapMapProps> = ({ analysis, onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<{ zone: string; text: string } | null>(null);

  const zones = [
    {
      id: 'known',
      title: 'KNOWN',
      subtitle: 'Empirically verified facts',
      items: analysis.informationGaps.known,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      borderColor: 'border-emerald-500/30',
      icon: CheckCircle
    },
    {
      id: 'uncertain',
      title: 'UNCERTAIN',
      subtitle: 'Known unknowns with variance',
      items: analysis.informationGaps.uncertain,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      borderColor: 'border-amber-500/30',
      icon: HelpCircle
    },
    {
      id: 'assumed',
      title: 'ASSUMED',
      subtitle: 'Beliefs treated as reality',
      items: analysis.informationGaps.assumed,
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      borderColor: 'border-purple-500/30',
      icon: CloudAlert
    },
    {
      id: 'missing',
      title: 'MISSING',
      subtitle: 'Critical unobtained signals',
      items: analysis.informationGaps.missing,
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      borderColor: 'border-rose-500/30',
      icon: AlertOctagon
    },
  ];

  const highestValue = analysis.informationGaps.highestValueUnknown;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            Epistemological Cartography
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            WHAT DO YOU ACTUALLY KNOW?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Sorting your current knowledge base into four distinct zones of certainty and identifying your single highest-value unknown.
          </p>
        </div>

        <button
          onClick={() => onNavigate('perspective-switchboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Perspective Switchboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zones.map((zone) => {
          const IconComp = zone.icon;
          return (
            <div
              key={zone.id}
              className={`p-6 rounded-3xl bg-[#121622]/80 border ${zone.borderColor} flex flex-col justify-between shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComp className="w-4 h-4 text-slate-400" />
                    <h2 className="text-sm font-bold tracking-wider text-white font-mono uppercase">
                      {zone.title}
                    </h2>
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${zone.badgeColor}`}>
                    {zone.items.length} items
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-4">
                  {zone.subtitle}
                </p>

                <div className="space-y-2">
                  {zone.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedItem({ zone: zone.title, text: item })}
                      className="w-full text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-start gap-2.5 cursor-pointer group"
                    >
                      <span className="text-slate-400 font-mono text-[10px] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Toast if item clicked */}
      {selectedItem && (
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase text-indigo-300 font-bold block">
                Selected from {selectedItem.zone}
              </span>
              <p className="text-slate-200 mt-0.5 font-medium">&ldquo;{selectedItem.text}&rdquo;</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* HIGHEST-VALUE UNKNOWN SPECIAL CARD */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#131726] to-[#0f1320] border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4" />
            HIGHEST-VALUE UNKNOWN
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            What information could most change your reasoning?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
            {/* What to find out */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                WHAT TO FIND OUT
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {highestValue.whatToFindOut}
              </p>
            </div>

            {/* How to verify */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold mb-1">
                HOW TO VERIFY
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {highestValue.howToVerify}
              </p>
            </div>

            {/* Why it matters */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                WHY IT MATTERS
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {highestValue.whyItMatters}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
