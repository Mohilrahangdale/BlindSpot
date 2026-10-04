import React from 'react';
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  Eye, 
  Compass, 
  Layers, 
  ShieldAlert, 
  GitFork, 
  Search, 
  Users, 
  Scale, 
  HelpCircle, 
  Clock, 
  FlaskConical, 
  Flame, 
  CheckCircle2, 
  ChevronRight,
  PlusCircle,
  Briefcase,
  GraduationCap,
  Coins,
  Rocket,
  Heart,
  Home,
  Laptop,
  Check
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';
import { QUICK_TEMPLATES } from '../data/demoData';

interface CommandCenterProps {
  analysis: CognitiveAnalysisResult | null;
  onNavigate: (screen: ViewScreen) => void;
  onRunDemo: () => void;
  onSelectTemplate: (template: typeof QUICK_TEMPLATES[0]) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  analysis,
  onNavigate,
  onRunDemo,
  onSelectTemplate
}) => {
  const hasAnalysis = !!analysis;

  const discoverTools = [
    {
      id: 'reasoning-xray' as ViewScreen,
      title: 'Reasoning X-Ray',
      description: 'Deconstruct what is actively driving your decision versus what you have not yet articulated.',
      icon: Eye,
      status: hasAnalysis ? `${analysis.drivers.length} drivers isolated` : 'Ready for input',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'blind-spot-radar' as ViewScreen,
      title: 'Blind Spot Radar',
      description: '10-dimensional radar mapping your coverage across financial, emotional, risk, and time horizons.',
      icon: Compass,
      status: hasAnalysis ? `${analysis.overallCoverageScore}% dimension depth` : 'Awaiting data',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'assumption-auditor' as ViewScreen,
      title: 'Assumption Auditor',
      description: 'Detect invisible hypotheses you take for granted and test what breaks if they are false.',
      icon: ShieldAlert,
      status: hasAnalysis ? `${analysis.assumptions.length} assumptions detected` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'logic-friction' as ViewScreen,
      title: 'Logic Friction',
      description: 'Expose structural tensions between what you say you value and what your reasoning prioritizes.',
      icon: Flame,
      status: hasAnalysis ? `${analysis.logicFrictions.length} tensions surfaced` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
  ];

  const exploreTools = [
    {
      id: 'information-gap' as ViewScreen,
      title: 'Information Gap Map',
      description: 'Segment your worldview into Known, Uncertain, Assumed, and Missing, isolating your highest-value unknown.',
      icon: Search,
      status: hasAnalysis ? `${analysis.informationGaps.missing.length} key gaps identified` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'perspective-switchboard' as ViewScreen,
      title: 'Perspective Switchboard',
      description: 'Simulate critical questions from Future You, a senior mentor, a skeptical peer, and close supporters.',
      icon: Users,
      status: hasAnalysis ? `${analysis.perspectives.length} viewpoints active` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'counterfactual-mirror' as ViewScreen,
      title: 'Counterfactual Mirror',
      description: 'Stress-test your convictions by altering key variables: what if the primary benefit disappeared?',
      icon: GitFork,
      status: hasAnalysis ? `${analysis.counterfactuals.length} scenarios generated` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'opportunity-cost' as ViewScreen,
      title: 'Opportunity Cost Map',
      description: 'Itemize the invisible trade-offs in time, flexibility, relationships, and secondary projects.',
      icon: Scale,
      status: hasAnalysis ? `${analysis.opportunityCosts.length} costs itemized` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
  ];

  const reflectTools = [
    {
      id: 'change-mind' as ViewScreen,
      title: 'What Would Change Your Mind?',
      description: 'Isolate high-impact facts and thresholds that would logically reverse your current trajectory.',
      icon: HelpCircle,
      status: hasAnalysis ? `${analysis.whatWouldChangeYourMind.length} factors tested` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'pre-mortem' as ViewScreen,
      title: 'Pre-Mortem Protocol',
      description: 'Assume the decision completely failed in 6 months. Diagnose the root causes before committing.',
      icon: Clock,
      status: hasAnalysis ? 'Failure & Success balanced' : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'experiments' as ViewScreen,
      title: 'Decision Experiments',
      description: 'Low-cost behavioral tests you can run in 48 hours to replace guesswork with empirical data.',
      icon: FlaskConical,
      status: hasAnalysis ? `${analysis.experiments.length} small tests designed` : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
    {
      id: 'reflection-mode' as ViewScreen,
      title: 'Reflection Mode',
      description: 'Answer 5 high-leverage targeted questions to synthesize your expanded perspective.',
      icon: Layers,
      status: hasAnalysis ? '5 questions ready' : 'Ready',
      statusType: hasAnalysis ? 'active' : 'empty'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      {/* Dashboard Hero */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#131724] to-[#0d1018] border border-slate-800 p-8 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Cognitive Workspace Active
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
            WHAT&apos;S ON YOUR MIND?
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Bring a decision. We&apos;ll help you examine the thinking behind it.
          </p>

          {hasAnalysis ? (
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Decision Under Examination</div>
              <div className="text-sm font-semibold text-white mt-1 line-clamp-2">
                &ldquo;{analysis.decision}&rdquo;
              </div>
              <div className="mt-2 text-xs text-indigo-300 line-clamp-1">
                {analysis.summary}
              </div>
            </div>
          ) : (
            <p className="mt-2 text-xs font-mono text-slate-300">
              Your thinking workspace is ready. No previous decisions loaded.
            </p>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('decision-lab')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ START A NEW DECISION</span>
            </button>

            {hasAnalysis ? (
              <button
                onClick={() => onNavigate('reasoning-xray')}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>CONTINUE THINKING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onRunDemo}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-indigo-200 font-semibold text-sm border border-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-indigo-400" />
                <span>LOAD DEMO DECISION</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* LIVE DEMO CARD */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-950/60 via-[#131726] to-[#121623] border border-indigo-500/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Featured Sample Decision
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              SEE THE BLIND SPOT IN ACTION
            </h2>
            <p className="text-sm text-slate-300">
              Realistic candidate scenario: <span className="text-indigo-200 font-medium">&ldquo;Should I accept a 6-month internship at a logistics startup?&rdquo;</span>
            </p>
            <p className="text-xs text-slate-400">
              Populates full multi-factor reasoning (stipend, 20-min commute, university lecture collision) and runs our AI reasoning engine in under 60 seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRunDemo}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-950 flex items-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RUN LIVE DEMO</span>
            </button>
          </div>
        </div>
      </section>

      {/* THINKING COVERAGE COMPONENT */}
      <section className="rounded-2xl bg-[#11141e]/90 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Compass className="w-4 h-4 text-indigo-400" />
              Cognitive Dimension Audit
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              THINKING COVERAGE
            </h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-indigo-300">
              {hasAnalysis ? `${analysis.overallCoverageScore}%` : '0%'}
            </div>
            <div className="text-[11px] text-slate-400">
              {hasAnalysis ? 'Breadth of Dimensions Explored' : 'No decision loaded yet'}
            </div>
          </div>
        </div>

        {/* Dimension Chips / Status */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(hasAnalysis && analysis.coverage.length > 0 
            ? analysis.coverage 
            : [
                { id: 'fin', name: 'Financial', explored: false, score: 0, note: 'Not audited' },
                { id: 'car', name: 'Career Growth', explored: false, score: 0, note: 'Not audited' },
                { id: 'time', name: 'Time & Schedule', explored: false, score: 0, note: 'Not audited' },
                { id: 'risk', name: 'Risk Management', explored: false, score: 0, note: 'Not audited' },
                { id: 'val', name: 'Core Values', explored: false, score: 0, note: 'Not audited' },
                { id: 'long', name: 'Long-term', explored: false, score: 0, note: 'Not audited' },
                { id: 'opp', name: 'Opportunity Cost', explored: false, score: 0, note: 'Not audited' },
                { id: 'rev', name: 'Reversibility', explored: false, score: 0, note: 'Not audited' },
                { id: 'soc', name: 'People Affected', explored: false, score: 0, note: 'Not audited' },
                { id: 'emo', name: 'Emotional Energy', explored: false, score: 0, note: 'Not audited' },
              ]
          ).map((dim) => (
            <div
              key={dim.name}
              className={`p-3 rounded-xl border transition-all ${
                dim.explored
                  ? 'bg-indigo-950/20 border-indigo-500/30'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {dim.name}
                </span>
                {dim.explored ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className="text-xs font-mono text-slate-400">?</span>
                )}
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    dim.score > 60 ? 'bg-indigo-500' : dim.score > 30 ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                {dim.note || `${dim.score}% mapped`}
              </div>
            </div>
          ))}
        </div>

        {/* Small explanation */}
        <p className="mt-4 text-xs text-slate-400 italic">
          Coverage measures how broadly you&apos;ve examined the decision — not whether the decision is good or bad.
        </p>
      </section>

      {/* QUICK TEMPLATES SYSTEM */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Instant Exploration
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              START WITH A DECISION TEMPLATE
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Click any archetype to populate Decision Lab
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl)}
              className="p-5 rounded-2xl bg-[#11141e]/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-[#141926] text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                  {tmpl.category}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                {tmpl.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {tmpl.prompt}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* DASHBOARD FEATURE SYSTEM: YOUR THINKING TOOLKIT */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Cognitive Laboratory Architecture
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            YOUR THINKING TOOLKIT
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Organized into three systematic investigative phases: Discover, Explore, and Reflect.
          </p>
        </div>

        {/* 1. DISCOVER GROUP */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300">
              01 · DISCOVER
            </h3>
            <span className="text-xs text-slate-300">Deconstruct internal drivers & biases</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {discoverTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="p-5 rounded-2xl bg-[#11141e]/90 border border-slate-800 hover:border-indigo-500/40 hover:bg-[#141926] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {tool.status}
                    </span>
                    <button
                      onClick={() => onNavigate(tool.id)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. EXPLORE GROUP */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300">
              02 · EXPLORE
            </h3>
            <span className="text-xs text-slate-300">Examine unconsidered perspectives & gaps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exploreTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="p-5 rounded-2xl bg-[#11141e]/90 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#141926] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {tool.status}
                    </span>
                    <button
                      onClick={() => onNavigate(tool.id)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. REFLECT GROUP */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300">
              03 · REFLECT
            </h3>
            <span className="text-xs text-slate-300">Stress-test convictions before committing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reflectTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="p-5 rounded-2xl bg-[#11141e]/90 border border-slate-800 hover:border-purple-500/40 hover:bg-[#141926] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {tool.status}
                    </span>
                    <button
                      onClick={() => onNavigate(tool.id)}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
