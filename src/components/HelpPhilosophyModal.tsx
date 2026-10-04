import React from 'react';
import { 
  X, 
  ShieldCheck, 
  BrainCircuit, 
  HelpCircle, 
  Check, 
  AlertTriangle,
  Scale
} from 'lucide-react';
import { TrustBadge } from './TrustBadge';

interface HelpPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpPhilosophyModal: React.FC<HelpPhilosophyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121622] border border-indigo-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight font-['Space_Grotesk']">
                Cognitive Mirror Constitution
              </h2>
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">
                The Blind Spot Philosophy &amp; Trust Layer
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Core Principle */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            01. ZERO OUTSOURCING DIRECTIVE
          </div>
          <p className="leading-relaxed text-slate-400">
            People often use AI to escape the discomfort of making tough choices, asking chatbots &ldquo;What should I do?&rdquo;. This weakens human agency.
            <strong className="text-slate-200"> THE BLIND SPOT is not a chatbot and will never decide for you.</strong> We mirror your reasoning back to you with structural rigor so you see what your instinct missed.
          </p>
        </div>

        {/* 2. Prohibited vs Encouraged Phrasing */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            02. STRICT NEUTRALITY ARCHITECTURE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-rose-300 font-bold">
                PROHIBITED (NEVER OUTPUTTED)
              </div>
              <ul className="text-[11px] text-rose-200 space-y-1 list-disc list-inside">
                <li>&ldquo;You should choose X.&rdquo;</li>
                <li>&ldquo;Definitely do X.&rdquo;</li>
                <li>&ldquo;Don&apos;t do X.&rdquo;</li>
                <li>&ldquo;The best option for you is X.&rdquo;</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                ENCOURAGED COGNITIVE PHRASING
              </div>
              <ul className="text-[11px] text-emerald-200 space-y-1 list-disc list-inside">
                <li>&ldquo;You may want to consider...&rdquo;</li>
                <li>&ldquo;Your reasoning appears to assume...&rdquo;</li>
                <li>&ldquo;One factor that may be missing is...&rdquo;</li>
                <li>&ldquo;A question worth exploring is...&rdquo;</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. AI Trust Layer Badges */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            03. AI TRUST LAYER SYSTEM
          </div>
          <p className="text-xs text-slate-400">
            Every insight produced by the system is visually labeled to eliminate confusion between your stated facts, AI deductions, external possibilities, and questions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Explicitly supplied by you</div>
              </div>
              <TrustBadge label="FACT FROM YOU" />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Deduced from your statements</div>
              </div>
              <TrustBadge label="INFERENCE" />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Plausible scenario or trade-off</div>
              </div>
              <TrustBadge label="POSSIBILITY" />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Critical inquiry to explore</div>
              </div>
              <TrustBadge label="QUESTION" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
