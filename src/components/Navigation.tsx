import React from 'react';
import { 
  Compass, 
  BrainCircuit, 
  BookMarked, 
  Sparkles, 
  Play, 
  HelpCircle, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { ViewScreen } from '../types';

interface NavigationProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  hasActiveAnalysis: boolean;
  onRunDemo: () => void;
  onOpenHelp: () => void;
  journalCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  hasActiveAnalysis,
  onRunDemo,
  onOpenHelp,
  journalCount
}) => {
  const [toolkitMenuOpen, setToolkitMenuOpen] = React.useState(false);

  const screensList: { id: ViewScreen; label: string; group: string }[] = [
    { id: 'command-center', label: 'Command Center', group: 'Overview' },
    { id: 'decision-lab', label: 'Decision Lab', group: 'Overview' },
    { id: 'thinking-map', label: 'Thinking Map', group: 'Overview' },
    { id: 'reasoning-xray', label: 'Reasoning X-Ray', group: 'Discover' },
    { id: 'blind-spot-radar', label: 'Blind Spot Radar', group: 'Discover' },
    { id: 'assumption-auditor', label: 'Assumption Auditor', group: 'Discover' },
    { id: 'logic-friction', label: 'Logic Friction', group: 'Discover' },
    { id: 'information-gap', label: 'Information Gap Map', group: 'Explore' },
    { id: 'perspective-switchboard', label: 'Perspective Switchboard', group: 'Explore' },
    { id: 'counterfactual-mirror', label: 'Counterfactual Mirror', group: 'Explore' },
    { id: 'opportunity-cost', label: 'Opportunity Cost', group: 'Explore' },
    { id: 'change-mind', label: 'What Would Change Mind', group: 'Reflect' },
    { id: 'pre-mortem', label: 'Pre-Mortem', group: 'Reflect' },
    { id: 'experiments', label: 'Decision Experiments', group: 'Reflect' },
    { id: 'reflection-mode', label: 'Reflection Mode', group: 'Reflect' },
    { id: 'before-after', label: 'Before vs After', group: 'Reflect' },
    { id: 'decision-journal', label: 'Decision Journal', group: 'Archive' },
  ];

  const currentScreenObj = screensList.find(s => s.id === currentScreen);

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -m-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-sm shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-[#0d1017] rounded-[7px] flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="font-bold tracking-tight text-white flex items-center gap-1.5 text-base leading-none">
                THE BLIND SPOT
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-indigo-300/70 mt-1">
                Cognitive Mirror
              </div>
            </div>
          </button>

          <span className="hidden sm:inline-block text-slate-700">|</span>

          {/* Quick jump to Command Center */}
          <button
            onClick={() => onNavigate('command-center')}
            className={`hidden md:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors ${
              currentScreen === 'command-center' 
                ? 'text-white bg-slate-800' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Command Center
          </button>
        </div>

        {/* Center Screen Navigator dropdown */}
        <div className="relative">
          <button
            onClick={() => setToolkitMenuOpen(!toolkitMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800/60 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="max-w-[130px] sm:max-w-[200px] truncate">
              {currentScreenObj ? currentScreenObj.label : 'Select View'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {toolkitMenuOpen && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-72 max-h-[80vh] overflow-y-auto rounded-xl bg-[#121622] border border-slate-800 shadow-2xl p-2 z-50 divide-y divide-slate-800/60 text-xs"
              onMouseLeave={() => setToolkitMenuOpen(false)}
            >
              {['Overview', 'Discover', 'Explore', 'Reflect', 'Archive'].map(group => (
                <div key={group} className="py-1.5 first:pt-0 last:pb-0">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {group}
                  </div>
                  {screensList
                    .filter(s => s.group === group)
                    .map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setToolkitMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition-colors ${
                          currentScreen === item.id 
                            ? 'bg-indigo-600/20 text-indigo-300 font-semibold' 
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.id === 'decision-journal' && journalCount > 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 rounded font-mono text-slate-400">
                            {journalCount}
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2">
          {/* Live Demo Trigger */}
          <button
            onClick={onRunDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm shadow-indigo-950"
            title="Load 6-Month Internship Sample Decision"
          >
            <Play className="w-3 h-3 fill-indigo-400 text-indigo-400" />
            <span className="hidden sm:inline">Live Demo</span>
          </button>

          {/* Thinking Map Quick Icon */}
          {hasActiveAnalysis && (
            <button
              onClick={() => onNavigate('thinking-map')}
              className={`p-2 rounded-lg text-xs transition-colors border ${
                currentScreen === 'thinking-map'
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="Interactive Thinking Map"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          {/* Decision Lab CTA */}
          <button
            onClick={() => onNavigate('decision-lab')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            + Decision Lab
          </button>

          {/* Decision Journal */}
          <button
            onClick={() => onNavigate('decision-journal')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors relative"
            title="Decision Journal"
          >
            <BookMarked className="w-4 h-4" />
            {journalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] text-white flex items-center justify-center font-bold">
                {journalCount}
              </span>
            )}
          </button>

          {/* Help Modal */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Cognitive Philosophy & Neutrality Rules"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
