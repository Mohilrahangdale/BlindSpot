import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Compass, 
  Eye, 
  HelpCircle, 
  Clock, 
  ShieldAlert, 
  Scale, 
  Users, 
  GitFork, 
  Flame, 
  Info,
  Maximize2
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface ThinkingMapProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const ThinkingMap: React.FC<ThinkingMapProps> = ({ analysis, onNavigate }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const branches = [
    { id: 'b-goals', label: 'Goals', screen: 'reasoning-xray' as ViewScreen, desc: 'Primary stated outcomes & ambitions', color: 'indigo', count: analysis.drivers.length },
    { id: 'b-values', label: 'Values', screen: 'reasoning-xray' as ViewScreen, desc: 'Inferred deep personal drivers', color: 'indigo', count: analysis.inferredValues.length },
    { id: 'b-assumptions', label: 'Assumptions', screen: 'assumption-auditor' as ViewScreen, desc: 'Unstated premises requiring audit', color: 'purple', count: analysis.assumptions.length },
    { id: 'b-known', label: 'Known Facts', screen: 'information-gap' as ViewScreen, desc: 'Empirically verified data', color: 'emerald', count: analysis.informationGaps.known.length },
    { id: 'b-unknown', label: 'Unknowns', screen: 'information-gap' as ViewScreen, desc: 'Missing critical information', color: 'amber', count: analysis.informationGaps.missing.length },
    { id: 'b-risks', label: 'Risks', screen: 'pre-mortem' as ViewScreen, desc: 'Potential failure modes', color: 'rose', count: analysis.preMortem.failureScenario.causes.length },
    { id: 'b-benefits', label: 'Visible Drivers', screen: 'reasoning-xray' as ViewScreen, desc: 'High-influence visible factors', color: 'cyan', count: analysis.drivers.length },
    { id: 'b-tradeoffs', label: 'Logic Tensions', screen: 'logic-friction' as ViewScreen, desc: 'Friction between goals and choices', color: 'amber', count: analysis.logicFrictions.length },
    { id: 'b-people', label: 'Perspectives', screen: 'perspective-switchboard' as ViewScreen, desc: 'Viewpoints from mentors & peers', color: 'cyan', count: analysis.perspectives.length },
    { id: 'b-time', label: 'Time Horizon', screen: 'blind-spot-radar' as ViewScreen, desc: 'Commitment stamina & fatigue', color: 'purple', count: 10 },
    { id: 'b-opportunity', label: 'Opportunity Cost', screen: 'opportunity-cost' as ViewScreen, desc: 'Sacrificed alternative paths', color: 'rose', count: analysis.opportunityCosts.length },
    { id: 'b-questions', label: 'Critical Questions', screen: 'change-mind' as ViewScreen, desc: 'Inquiries that could change your mind', color: 'cyan', count: analysis.whatWouldChangeYourMind.length },
  ];

  const numBranches = branches.length;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Neural Topology Network
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            INTERACTIVE THINKING MAP
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            A comprehensive node network linking your core decision to every surrounding cognitive dimension. Click any node to inspect its dedicated analysis.
          </p>
        </div>

        <button
          onClick={() => onNavigate('command-center')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Command Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Signature Visual Canvas / Network */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[480px] max-h-[640px] rounded-3xl bg-[#0f121b] border border-slate-800 p-6 flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Ambient subtle backlights */}
        <div className="absolute w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Outer radial rings */}
        <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full border border-slate-800/80 pointer-events-none" />
        <div className="absolute w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full border border-slate-800/40 pointer-events-none" />

        {/* SVG Network Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {branches.map((b, i) => {
            const angle = (i * (360 / numBranches) * Math.PI) / 180;
            const radius = 200;
            const cx = 50 + (radius / 5.2) * Math.cos(angle);
            const cy = 50 + (radius / 5.8) * Math.sin(angle);
            const isHovered = hoveredNode === b.id;
            return (
              <line
                key={b.id}
                x1="50%"
                y1="50%"
                x2={`${cx}%`}
                y2={`${cy}%`}
                stroke="url(#mapGrad)"
                strokeWidth={isHovered ? '2' : '1'}
                strokeDasharray={isHovered ? 'none' : '2,3'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Core: YOUR DECISION */}
        <div className="relative z-10 text-center">
          <div className="w-32 sm:w-44 h-32 sm:h-44 rounded-3xl bg-gradient-to-b from-[#181d2c] to-[#0d1018] border-2 border-indigo-500/60 shadow-2xl shadow-indigo-950 flex flex-col items-center justify-center p-3 text-center transition-transform hover:scale-105">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mb-2 shadow-sm shadow-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase font-bold">
              Cognitive Core
            </span>
            <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-1 line-clamp-2 px-1">
              &ldquo;{analysis.decision}&rdquo;
            </div>
            <span className="text-[9px] text-slate-400 mt-1 font-mono">
              {analysis.overallCoverageScore}% Coverage
            </span>
          </div>
        </div>

        {/* Orbiting Branch Nodes */}
        {branches.map((b, i) => {
          const angle = (i * (360 / numBranches) * Math.PI) / 180;
          const radiusX = 42;
          const radiusY = 38;
          const leftPos = 50 + radiusX * Math.cos(angle);
          const topPos = 50 + radiusY * Math.sin(angle);
          const isHovered = hoveredNode === b.id;

          return (
            <div
              key={b.id}
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20"
              onMouseEnter={() => setHoveredNode(b.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <button
                onClick={() => onNavigate(b.screen)}
                className={`p-2.5 sm:p-3 rounded-2xl text-left border transition-all cursor-pointer group ${
                  isHovered
                    ? 'bg-indigo-600/30 border-cyan-400 text-white shadow-xl shadow-indigo-950 scale-110 z-30'
                    : 'bg-[#121622]/90 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    b.color === 'emerald' ? 'bg-emerald-400' :
                    b.color === 'amber' ? 'bg-amber-400' :
                    b.color === 'rose' ? 'bg-rose-400' :
                    b.color === 'cyan' ? 'bg-cyan-400' : 'bg-indigo-400'
                  }`} />
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider">
                    {b.label}
                  </span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                    {b.count}
                  </span>
                </div>

                {isHovered && (
                  <div className="text-[10px] text-slate-300 max-w-[130px] mt-1 leading-snug">
                    {b.desc}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Jump List below map */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {branches.map((b) => (
          <button
            key={b.id}
            onClick={() => onNavigate(b.screen)}
            className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-left transition-colors cursor-pointer"
          >
            <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
              {b.label}
            </div>
            <div className="text-xs text-slate-300 truncate mt-0.5">
              Open Analysis →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
