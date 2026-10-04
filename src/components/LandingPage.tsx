import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Eye, 
  Check, 
  ShieldCheck, 
  Layers, 
  Compass, 
  SlidersHorizontal,
  Split,
  Search,
  HelpCircle
} from 'lucide-react';
import { ViewScreen } from '../types';

interface LandingPageProps {
  onNavigate: (screen: ViewScreen) => void;
  onRunDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onRunDemo }) => {
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  const satelliteNodes = [
    { id: 'assumptions', label: 'ASSUMPTIONS', angle: 0, desc: 'Unstated premises you take for granted' },
    { id: 'unknown', label: 'UNKNOWN', angle: 45, desc: 'Critical information currently missing' },
    { id: 'risks', label: 'RISKS', angle: 90, desc: 'Downside vulnerabilities left unprotected' },
    { id: 'values', label: 'VALUES', angle: 135, desc: 'What you truly prioritize under trade-offs' },
    { id: 'tradeoffs', label: 'TRADE-OFFS', angle: 180, desc: 'Direct friction between conflicting goals' },
    { id: 'perspectives', label: 'PERSPECTIVES', angle: 225, desc: 'Viewpoints from mentors, future self, and critics' },
    { id: 'questions', label: 'QUESTIONS', angle: 270, desc: 'Inquiries that could fundamentally change your mind' },
    { id: 'opportunity', label: 'OPPORTUNITY COST', angle: 315, desc: 'The invisible paths forfeited by saying yes' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden">
      {/* Background ambient radial gradients - subtle & sophisticated */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[350px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-20 w-full">
        {/* Top Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            A New Category: AI Cognitive Mirror
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-['Space_Grotesk']">
            SEE WHAT YOUR <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-200 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              THINKING MISSED.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            An AI cognitive mirror that uncovers assumptions, contradictions, missing perspectives, and unanswered questions before you make important decisions.
          </p>

          <p className="mt-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            Don&apos;t outsource your decision · Expand your thinking
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('decision-lab')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>ENTER DECISION LAB</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRunDemo}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-indigo-500/50 shadow-lg shadow-black/40 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span>TRY LIVE DEMO</span>
            </button>
          </div>
        </div>

        {/* Sophisticated Cognitive Visual (Central Node + Orbiting Dimensions) */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] rounded-2xl bg-gradient-to-b from-[#10141f]/80 to-[#0b0e15]/90 border border-slate-800/90 p-6 flex items-center justify-center shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Subtle grid pattern background */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Orbit concentric circles */}
            <div className="absolute w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full border border-indigo-500/10 pointer-events-none" />
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-slate-800/60 pointer-events-none" />

            {/* SVG Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {satelliteNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                // responsive radius
                const radius = 180;
                const cx = 50 + (radius / 5) * Math.cos(rad);
                const cy = 50 + (radius / 6) * Math.sin(rad);
                const isHovered = hoveredNode === node.id;
                return (
                  <line
                    key={node.id}
                    x1="50%"
                    y1="50%"
                    x2={`${cx}%`}
                    y2={`${cy}%`}
                    stroke="url(#lineGrad)"
                    strokeWidth={isHovered ? "2" : "1"}
                    strokeDasharray={isHovered ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Central Node */}
            <div className="relative z-10 text-center">
              <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-2xl bg-gradient-to-b from-[#181d2c] to-[#0f131f] border-2 border-indigo-500/50 shadow-2xl shadow-indigo-900/50 flex flex-col items-center justify-center p-3 text-center transition-transform hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 mb-2 shadow-sm shadow-indigo-400" />
                <span className="text-[11px] font-mono tracking-widest text-indigo-300 uppercase">
                  Central Focus
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                  YOUR DECISION
                </span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  Reasoning Core
                </span>
              </div>
            </div>

            {/* Orbiting Satellite Nodes */}
            {satelliteNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const radiusPercentX = 40;
              const radiusPercentY = 38;
              const leftPos = 50 + radiusPercentX * Math.cos(rad);
              const topPos = 50 + radiusPercentY * Math.sin(rad);
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute z-20"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <button
                    onClick={() => onNavigate('decision-lab')}
                    className={`group px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-xl shadow-indigo-950 scale-110'
                        : 'bg-[#121622]/90 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-cyan-300' : 'bg-indigo-400/70'}`} />
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider">
                        {node.label}
                      </span>
                    </div>
                    {isHovered && (
                      <p className="text-[10px] text-slate-300 max-w-[140px] mt-1 leading-snug">
                        {node.desc}
                      </p>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive hint */}
          <div className="mt-3 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Hover over any cognitive dimension or enter the lab to explore your reasoning</span>
          </div>
        </div>

        {/* 3 Core Pillars: Laboratory Constitution */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#11141e]/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">Zero Outsourcing</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We never say &quot;You should choose X&quot;. The AI never takes the wheel. We mirror your reasoning back to you with structural rigor so the decision stays 100% yours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#11141e]/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">10-Dimensional Radar</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Financial, Career, Time, Risk, Emotional, Social, Long-term, Opportunity Cost, Values, and Reversibility. See exactly which angles you naturally overlooked.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#11141e]/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">Cognitive Laboratory</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Assumption audits, logic friction checks, counterfactual stress tests, and pre-mortems give you an intellectual flight simulator before you commit.
            </p>
          </div>
        </div>
      </div>

      {/* Footer subtle brand mark */}
      <footer className="border-t border-slate-800/60 py-6 px-4 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">THE BLIND SPOT</span>
            <span>·</span>
            <span>Personal Cognitive Laboratory</span>
          </div>
          <div>
            Built with Google Gemini 3.8 & React · Cognitive Mirror Architecture
          </div>
        </div>
      </footer>
    </div>
  );
};
