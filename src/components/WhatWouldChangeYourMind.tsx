import React from 'react';
import { 
  HelpCircle, 
  ArrowRight, 
  Check, 
  HelpCircle as QuestionIcon, 
  Ban, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen, WhatWouldChangeYourMindItem } from '../types';

interface WhatWouldChangeYourMindProps {
  analysis: CognitiveAnalysisResult;
  onUpdateAnalysis: (updated: CognitiveAnalysisResult) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const WhatWouldChangeYourMind: React.FC<WhatWouldChangeYourMindProps> = ({
  analysis,
  onUpdateAnalysis,
  onNavigate
}) => {
  const handleSetStatus = (id: string, status: 'KNOWN' | 'UNKNOWN' | 'NOT_RELEVANT') => {
    const updated = analysis.whatWouldChangeYourMind.map(item => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });

    onUpdateAnalysis({
      ...analysis,
      whatWouldChangeYourMind: updated
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Decision Inversion Criteria
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            WHAT WOULD CHANGE YOUR MIND?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            If you cannot state what evidence would reverse your decision, you are rationalizing rather than deciding. Mark the operational status of each critical signal.
          </p>
        </div>

        <button
          onClick={() => onNavigate('pre-mortem')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Pre-Mortem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Factors List */}
      <div className="space-y-6">
        {analysis.whatWouldChangeYourMind.map((item, idx) => {
          return (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-[#121622]/90 border border-slate-800 hover:border-slate-700 transition-all space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  PIVOT FACTOR #{idx + 1}
                </span>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    onClick={() => handleSetStatus(item.id, 'KNOWN')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      item.status === 'KNOWN'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>KNOWN</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(item.id, 'UNKNOWN')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      item.status === 'UNKNOWN'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <QuestionIcon className="w-3 h-3" />
                    <span>UNKNOWN</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(item.id, 'NOT_RELEVANT')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      item.status === 'NOT_RELEVANT'
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Ban className="w-3 h-3" />
                    <span>NOT RELEVANT</span>
                  </button>
                </div>
              </div>

              {/* Information Statement */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  CRITICAL INFORMATION
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.information}
                </h2>
              </div>

              {/* 3 Detail columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 text-xs">
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
                    HOW TO VERIFY
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.howToVerify}
                  </p>
                </div>

                {/* Possible impact */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">
                    POSSIBLE IMPACT
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.possibleImpact}
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
