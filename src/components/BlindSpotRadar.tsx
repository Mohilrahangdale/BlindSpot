import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle, 
  ChevronRight, 
  Info,
  CheckCircle,
  FileQuestion,
  Layers
} from 'lucide-react';
import { CognitiveAnalysisResult, RadarDimension, ViewScreen } from '../types';

interface BlindSpotRadarProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const BlindSpotRadar: React.FC<BlindSpotRadarProps> = ({ analysis, onNavigate }) => {
  const dimensions: RadarDimension[] = analysis.radarDimensions && analysis.radarDimensions.length >= 10
    ? analysis.radarDimensions
    : [
        { id: 'financial', name: 'Financial', dimension: 'Financial', exploredLevel: 80, whyItMatters: 'Economic stability & upside', whatYouConsidered: 'Direct stipend and salary', whatMayBeMissing: 'Taxes and cost of delayed graduation', questionToExplore: 'What are the net second-order financial impacts?' },
        { id: 'career', name: 'Career Growth', dimension: 'Career', exploredLevel: 75, whyItMatters: 'High-leverage engineering credentials', whatYouConsidered: 'Resume value and modern tech stack', whatMayBeMissing: 'Senior mentorship allocation', questionToExplore: 'Will you receive rigorous code reviews?' },
        { id: 'time', name: 'Time & Schedule', dimension: 'Time', exploredLevel: 55, whyItMatters: 'Physical stamina & burnout prevention', whatYouConsidered: '9 to 6 hours & 20m commute', whatMayBeMissing: 'University lecture schedule collision', questionToExplore: 'How many net rest hours remain weekly?' },
        { id: 'risk', name: 'Risk Management', dimension: 'Risk', exploredLevel: 40, whyItMatters: 'Contingency plans if conditions worsen', whatYouConsidered: 'Optimistic expectations', whatMayBeMissing: 'Burnout and exam collision mitigation', questionToExplore: 'What is your trigger to pivot or abort?' },
        { id: 'emotional', name: 'Emotional & Energy', dimension: 'Emotional', exploredLevel: 30, whyItMatters: 'Psychological balance under pressure', whatYouConsidered: 'General enthusiasm', whatMayBeMissing: 'Stress of dual-context switching', questionToExplore: 'How do you prevent chronic overload?' },
        { id: 'social', name: 'Social & Community', dimension: 'Social', exploredLevel: 40, whyItMatters: 'Preserving core university network', whatYouConsidered: 'One friend recommendation', whatMayBeMissing: 'Impact on campus peers and professors', questionToExplore: 'Will this detach you from relationships that matter?' },
        { id: 'longTerm', name: 'Long-term Horizon', dimension: 'Long-term', exploredLevel: 45, whyItMatters: 'Connecting current choices to 3-year vision', whatYouConsidered: 'Next year graduation', whatMayBeMissing: 'Niche domain perception vs generalist prestige', questionToExplore: 'Does this narrow or widen your post-grad options?' },
        { id: 'opportunityCost', name: 'Opportunity Cost', dimension: 'Opportunity Cost', exploredLevel: 35, whyItMatters: 'Everything sacrificed by committing', whatYouConsidered: 'The immediate offer', whatMayBeMissing: 'Summer alternatives and personal capstones', questionToExplore: 'What high-leverage alternative project is lost?' },
        { id: 'values', name: 'Core Values', dimension: 'Values', exploredLevel: 70, whyItMatters: 'Alignment with deep personal identity', whatYouConsidered: 'Desire for technical autonomy', whatMayBeMissing: 'Work-life boundary expectations', questionToExplore: 'Does this environment fit your preferred learning style?' },
        { id: 'reversibility', name: 'Reversibility', dimension: 'Reversibility', exploredLevel: 50, whyItMatters: 'Ease of modifying or exiting if flawed', whatYouConsidered: 'Fixed 6-month term', whatMayBeMissing: 'Trial period or 3-month review clause', questionToExplore: 'Can you negotiate a 3-month renewal checkpoint?' },
      ];

  const [selectedDimId, setSelectedDimId] = useState<string>(dimensions[0].id);

  const selectedDim = dimensions.find(d => d.id === selectedDimId) || dimensions[0];

  // SVG Radar Polygon Math
  const numPoints = dimensions.length;
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 140;

  // Generate coordinates for radar web
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numPoints) * index - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build polygon points string
  const polygonPoints = dimensions
    .map((dim, i) => {
      const { x, y } = getCoordinates(dim.exploredLevel, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid levels (25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Multidimensional Topology
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            BLIND SPOT RADAR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Click any dimension to reveal why it matters, what you considered, and what critical angles may still be missing.
          </p>
        </div>

        <button
          onClick={() => onNavigate('assumption-auditor')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Assumption Auditor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive SVG Radar */}
        <div className="lg:col-span-7 rounded-3xl bg-[#11141e]/90 border border-slate-800 p-6 flex flex-col items-center justify-center relative shadow-xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 self-start flex items-center gap-2">
            <span>10-Dimensional Thinking Polygon</span>
            <span className="text-slate-600">·</span>
            <span className="text-indigo-400">Click vertices to inspect</span>
          </div>

          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* Background circular web */}
              {gridLevels.map((lvl) => {
                const r = (lvl / 100) * maxRadius;
                return (
                  <circle
                    key={lvl}
                    cx={centerX}
                    cy={centerY}
                    r={r}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray={lvl === 100 ? 'none' : '3,3'}
                  />
                );
              })}

              {/* Axis lines */}
              {dimensions.map((dim, i) => {
                const { x, y } = getCoordinates(100, i);
                const isSelected = dim.id === selectedDimId;
                return (
                  <line
                    key={dim.id}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={isSelected ? '#6366f1' : '#1e293b'}
                    strokeWidth={isSelected ? '1.5' : '1'}
                  />
                );
              })}

              {/* The Data Polygon */}
              <polygon
                points={polygonPoints}
                fill="url(#radarGlow)"
                stroke="#6366f1"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Interactive Data Nodes */}
              {dimensions.map((dim, i) => {
                const { x, y } = getCoordinates(dim.exploredLevel, i);
                const isSelected = dim.id === selectedDimId;
                return (
                  <g 
                    key={dim.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedDimId(dim.id)}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : 4.5}
                      fill={isSelected ? '#22d3ee' : '#818cf8'}
                      stroke="#0f172a"
                      strokeWidth="2"
                      className="transition-all duration-200 group-hover:scale-125"
                    />
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={12}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        className="animate-spin"
                        style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '4s' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Outer Dimension Labels */}
              {dimensions.map((dim, i) => {
                const { x, y } = getCoordinates(118, i);
                const isSelected = dim.id === selectedDimId;
                return (
                  <text
                    key={dim.id}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    onClick={() => setSelectedDimId(dim.id)}
                    className={`text-[10px] font-mono cursor-pointer select-none transition-all ${
                      isSelected 
                        ? 'fill-cyan-300 font-bold' 
                        : 'fill-slate-400 hover:fill-slate-200'
                    }`}
                  >
                    {dim.name}
                  </text>
                );
              })}
            </svg>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center italic">
            Note: Percentages indicate relative exploration depth within your text, not a scientific psychological evaluation.
          </p>
        </div>

        {/* Right: Dimension Inspector Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#121622] border border-indigo-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Dimension Inspector
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5 font-['Space_Grotesk']">
                  {selectedDim.name}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-cyan-300">
                  {selectedDim.exploredLevel}%
                </div>
                <div className="text-[10px] text-slate-400">Coverage Depth</div>
              </div>
            </div>

            {/* Why it matters */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                <Info className="w-3 h-3 text-indigo-400" />
                WHY IT MATTERS
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {selectedDim.whyItMatters}
              </p>
            </div>

            {/* What you considered */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                WHAT YOU CONSIDERED
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {selectedDim.whatYouConsidered}
              </p>
            </div>

            {/* What may be missing */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                WHAT MAY BE MISSING
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {selectedDim.whatMayBeMissing}
              </p>
            </div>

            {/* Question to explore */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1">
                <FileQuestion className="w-3 h-3 text-cyan-400" />
                QUESTION TO EXPLORE
              </div>
              <p className="text-xs sm:text-sm text-indigo-200 italic font-medium bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-500/30">
                &ldquo;{selectedDim.questionToExplore}&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Dimension Selector Tabs */}
          <div className="p-4 rounded-2xl bg-[#11141e]/90 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              All 10 Dimensions
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dimensions.map((dim) => {
                const isSelected = dim.id === selectedDimId;
                return (
                  <button
                    key={dim.id}
                    onClick={() => setSelectedDimId(dim.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
                        : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{dim.name}</span>
                    <span className="text-[10px] font-mono ml-1 opacity-70">
                      {dim.exploredLevel}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
