import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  HeartHandshake, 
  Clock, 
  Terminal,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { CognitiveAnalysisResult, PerspectiveView, ViewScreen } from '../types';

interface PerspectiveSwitchboardProps {
  analysis: CognitiveAnalysisResult;
  onNavigate: (screen: ViewScreen) => void;
}

export const PerspectiveSwitchboard: React.FC<PerspectiveSwitchboardProps> = ({
  analysis,
  onNavigate
}) => {
  const perspectives = analysis.perspectives;
  const [selectedId, setSelectedId] = useState<string>(perspectives[0]?.id || 'p-1');

  const activePerspective = perspectives.find(p => p.id === selectedId) || perspectives[0];

  const getIcon = (roleName: string) => {
    if (roleName.includes('Future')) return UserCheck;
    if (roleName.includes('Mentor')) return GraduationCap;
    if (roleName.includes('Recruiter')) return Briefcase;
    if (roleName.includes('Skeptic')) return ShieldAlert;
    if (roleName.includes('Family')) return HeartHandshake;
    if (roleName.includes('5 Years')) return Clock;
    return Users;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Decentering Laboratory
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            CHANGE YOUR VIEWPOINT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Examine your reasoning through distinct simulated mental models. Step outside your current cognitive baseline.
          </p>
        </div>

        <button
          onClick={() => onNavigate('counterfactual-mirror')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span>Next: Counterfactual Mirror</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Perspective Switcher Buttons */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {perspectives.map((p) => {
          const isSelected = p.id === selectedId;
          const IconComp = getIcon(p.role);
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold border transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-950'
                  : 'bg-[#121622] border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{p.role}</span>
            </button>
          );
        })}
      </div>

      {/* Active Perspective Showcase */}
      {activePerspective && (
        <div className="p-8 rounded-3xl bg-[#11141e]/90 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                SIMULATED LENS: {activePerspective.role}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 font-['Space_Grotesk']">
                {activePerspective.tagline || 'Evaluating Core Trajectory'}
              </h2>
            </div>
            
            {/* Simulation disclaimer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 self-start sm:self-auto">
              <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span>{activePerspective.simulationDisclaimer || 'Simulated perspective for cognitive stress-testing.'}</span>
            </div>
          </div>

          {/* Perspective Summary */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
              THEIR PROBABLE ANGLE ON YOUR REASONING
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {activePerspective.perspectiveSummary}
            </p>
          </div>

          {/* Questions from this perspective */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold">
              QUESTIONS THIS PERSON WOULD ASK YOU
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePerspective.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#141824] border border-indigo-500/20 flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-indigo-100 font-medium italic leading-relaxed">
                    &ldquo;{q}&rdquo;
                  </p>
                  <span className="text-[10px] font-mono text-indigo-400/80 mt-3 self-end">
                    Targeted Inquiry #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
