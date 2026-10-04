import React, { useState, useEffect } from 'react';
import { ViewScreen, CognitiveAnalysisResult } from './types';
import { INTERNSHIP_DEMO_RESULT, INTERNSHIP_DEMO_INPUT, QUICK_TEMPLATES } from './data/demoData';

import { Navigation } from './components/Navigation';
import { HelpPhilosophyModal } from './components/HelpPhilosophyModal';

import { LandingPage } from './components/LandingPage';
import { CommandCenter } from './components/CommandCenter';
import { DecisionLab } from './components/DecisionLab';
import { ReasoningXRay } from './components/ReasoningXRay';
import { BlindSpotRadar } from './components/BlindSpotRadar';
import { AssumptionAuditor } from './components/AssumptionAuditor';
import { LogicFriction } from './components/LogicFriction';
import { InformationGapMap } from './components/InformationGapMap';
import { PerspectiveSwitchboard } from './components/PerspectiveSwitchboard';
import { CounterfactualMirror } from './components/CounterfactualMirror';
import { WhatWouldChangeYourMind } from './components/WhatWouldChangeYourMind';
import { PreMortem } from './components/PreMortem';
import { OpportunityCost } from './components/OpportunityCost';
import { DecisionExperiments } from './components/DecisionExperiments';
import { ReflectionMode } from './components/ReflectionMode';
import { BeforeVsAfter } from './components/BeforeVsAfter';
import { ThinkingMap } from './components/ThinkingMap';
import { DecisionJournal } from './components/DecisionJournal';

const LOCAL_STORAGE_ACTIVE_KEY = 'the_blind_spot_active_analysis';
const LOCAL_STORAGE_JOURNAL_KEY = 'the_blind_spot_journal_entries';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('landing');
  const [activeAnalysis, setActiveAnalysis] = useState<CognitiveAnalysisResult | null>(null);
  const [journalEntries, setJournalEntries] = useState<CognitiveAnalysisResult[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [pendingPrompt, setPendingPrompt] = useState<{ decision: string; reasoning: string }>({
    decision: '',
    reasoning: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedActive = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY);
      if (savedActive) {
        setActiveAnalysis(JSON.parse(savedActive));
      }
      const savedJournal = localStorage.getItem(LOCAL_STORAGE_JOURNAL_KEY);
      if (savedJournal) {
        setJournalEntries(JSON.parse(savedJournal));
      }
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
  }, []);

  // Save active analysis to localStorage
  const handleUpdateActiveAnalysis = (updated: CognitiveAnalysisResult) => {
    setActiveAnalysis(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save active analysis:', e);
    }
  };

  // Run the 1-click live demo for hackathon judges
  const handleRunDemo = () => {
    const demoData: CognitiveAnalysisResult = {
      ...INTERNSHIP_DEMO_RESULT,
      id: `demo-${Date.now()}`,
      timestamp: Date.now(),
    };
    handleUpdateActiveAnalysis(demoData);
    setCurrentScreen('reasoning-xray');
  };

  // Select a template
  const handleSelectTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    setPendingPrompt({
      decision: template.prompt,
      reasoning: template.reasoning,
    });
    setCurrentScreen('decision-lab');
  };

  // Save current active analysis to Journal
  const handleSaveToJournal = () => {
    if (!activeAnalysis) return;
    const exists = journalEntries.some(e => e.id === activeAnalysis.id);
    let updated: CognitiveAnalysisResult[];
    if (exists) {
      updated = journalEntries.map(e => e.id === activeAnalysis.id ? activeAnalysis : e);
    } else {
      updated = [activeAnalysis, ...journalEntries];
    }
    setJournalEntries(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_JOURNAL_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to journal:', e);
    }
  };

  // Load an entry from Journal
  const handleLoadJournalEntry = (entry: CognitiveAnalysisResult) => {
    handleUpdateActiveAnalysis(entry);
    setCurrentScreen('reasoning-xray');
  };

  // Delete an entry from Journal
  const handleDeleteJournalEntry = (id: string) => {
    const updated = journalEntries.filter(e => e.id !== id);
    setJournalEntries(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_JOURNAL_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to delete journal entry:', e);
    }
  };

  // Update notes on an entry
  const handleUpdateNotes = (id: string, notes: string) => {
    const updatedJournal = journalEntries.map(e => {
      if (e.id === id) {
        return { ...e, personalNotes: notes };
      }
      return e;
    });
    setJournalEntries(updatedJournal);
    if (activeAnalysis && activeAnalysis.id === id) {
      handleUpdateActiveAnalysis({ ...activeAnalysis, personalNotes: notes });
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_JOURNAL_KEY, JSON.stringify(updatedJournal));
    } catch (e) {
      console.warn('Failed to update notes:', e);
    }
  };

  const isCurrentSaved = activeAnalysis ? journalEntries.some(e => e.id === activeAnalysis.id) : false;

  // Fallback to demo if user navigates to an analysis view without data
  const currentAnalysisData = activeAnalysis || INTERNSHIP_DEMO_RESULT;

  return (
    <div className="min-h-screen bg-[#0b0d13] text-[#e2e8f0] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header / Navigation */}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        hasActiveAnalysis={!!activeAnalysis}
        onRunDemo={handleRunDemo}
        onOpenHelp={() => setIsHelpOpen(true)}
        journalCount={journalEntries.length}
      />

      {/* Main Screen Body */}
      <main className="flex-1 pb-16 md:pb-8">
        {currentScreen === 'landing' && (
          <LandingPage
            onNavigate={setCurrentScreen}
            onRunDemo={handleRunDemo}
          />
        )}

        {currentScreen === 'command-center' && (
          <CommandCenter
            analysis={activeAnalysis}
            onNavigate={setCurrentScreen}
            onRunDemo={handleRunDemo}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {currentScreen === 'decision-lab' && (
          <DecisionLab
            initialDecision={pendingPrompt.decision}
            initialReasoning={pendingPrompt.reasoning}
            onAnalysisComplete={(res) => {
              handleUpdateActiveAnalysis(res);
              setPendingPrompt({ decision: '', reasoning: '' });
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'reasoning-xray' && (
          <ReasoningXRay
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'blind-spot-radar' && (
          <BlindSpotRadar
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'assumption-auditor' && (
          <AssumptionAuditor
            analysis={currentAnalysisData}
            onUpdateAnalysis={handleUpdateActiveAnalysis}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'logic-friction' && (
          <LogicFriction
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'information-gap' && (
          <InformationGapMap
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'perspective-switchboard' && (
          <PerspectiveSwitchboard
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'counterfactual-mirror' && (
          <CounterfactualMirror
            analysis={currentAnalysisData}
            onUpdateAnalysis={handleUpdateActiveAnalysis}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'change-mind' && (
          <WhatWouldChangeYourMind
            analysis={currentAnalysisData}
            onUpdateAnalysis={handleUpdateActiveAnalysis}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'pre-mortem' && (
          <PreMortem
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'opportunity-cost' && (
          <OpportunityCost
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'experiments' && (
          <DecisionExperiments
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'reflection-mode' && (
          <ReflectionMode
            analysis={currentAnalysisData}
            onUpdateAnalysis={handleUpdateActiveAnalysis}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'before-after' && (
          <BeforeVsAfter
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
            onSaveToJournal={handleSaveToJournal}
            isSavedInJournal={isCurrentSaved}
          />
        )}

        {currentScreen === 'thinking-map' && (
          <ThinkingMap
            analysis={currentAnalysisData}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'decision-journal' && (
          <DecisionJournal
            journalEntries={journalEntries}
            activeAnalysis={activeAnalysis}
            onLoadEntry={handleLoadJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
            onUpdateNotes={handleUpdateNotes}
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile primary" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setCurrentScreen('command-center')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentScreen === 'command-center' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>Workspace</span>
        </button>
        <button
          onClick={() => setCurrentScreen('decision-lab')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentScreen === 'decision-lab' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>Lab</span>
        </button>
        <button
          onClick={() => setCurrentScreen('blind-spot-radar')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentScreen === 'blind-spot-radar' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>Radar</span>
        </button>
        <button
          onClick={() => setCurrentScreen('thinking-map')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentScreen === 'thinking-map' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>Map</span>
        </button>
        <button
          onClick={() => setCurrentScreen('decision-journal')}
          className={`flex flex-col items-center gap-0.5 p-1 ${
            currentScreen === 'decision-journal' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>Journal</span>
        </button>
      </nav>

      {/* Cognitive Philosophy & Help Modal */}
      <HelpPhilosophyModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
