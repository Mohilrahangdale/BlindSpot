import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  AlertCircle,
  BrainCircuit,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';
import { INTERNSHIP_DEMO_INPUT } from '../data/demoData';

interface DecisionLabProps {
  initialDecision?: string;
  initialReasoning?: string;
  onAnalysisComplete: (result: CognitiveAnalysisResult) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const DecisionLab: React.FC<DecisionLabProps> = ({
  initialDecision = '',
  initialReasoning = '',
  onAnalysisComplete,
  onNavigate
}) => {
  const [step, setStep] = useState<number>(1);
  const [decision, setDecision] = useState<string>(initialDecision);
  const [reasoning, setReasoning] = useState<string>(initialReasoning);

  // Optional Context Fields
  const [goals, setGoals] = useState<string>('');
  const [constraints, setConstraints] = useState<string>('');
  const [mattersMost, setMattersMost] = useState<string>('');
  const [fears, setFears] = useState<string>('');
  const [knowns, setKnowns] = useState<string>('');
  const [unknowns, setUnknowns] = useState<string>('');
  const [affectedPeople, setAffectedPeople] = useState<string>('');
  const [timeHorizon, setTimeHorizon] = useState<string>('');
  const [showOptionalFields, setShowOptionalFields] = useState<boolean>(false);

  // Loading States
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const loadingPhrases = [
    "Reading your reasoning...",
    "Mapping assumptions...",
    "Looking for missing information...",
    "Checking for logic friction...",
    "Preparing perspectives...",
    "Synthesizing 10-dimensional radar..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Sync props if changed
  useEffect(() => {
    if (initialDecision) setDecision(initialDecision);
    if (initialReasoning) setReasoning(initialReasoning);
  }, [initialDecision, initialReasoning]);

  const loadInternshipExample = () => {
    setDecision(INTERNSHIP_DEMO_INPUT.decision);
    setReasoning(INTERNSHIP_DEMO_INPUT.reasoning);
    setGoals(INTERNSHIP_DEMO_INPUT.optionalContext.goals);
    setConstraints(INTERNSHIP_DEMO_INPUT.optionalContext.constraints);
    setMattersMost(INTERNSHIP_DEMO_INPUT.optionalContext.mattersMost);
    setFears(INTERNSHIP_DEMO_INPUT.optionalContext.fears);
    setKnowns(INTERNSHIP_DEMO_INPUT.optionalContext.knowns);
    setUnknowns(INTERNSHIP_DEMO_INPUT.optionalContext.unknowns);
    setAffectedPeople(INTERNSHIP_DEMO_INPUT.optionalContext.affectedPeople);
    setTimeHorizon(INTERNSHIP_DEMO_INPUT.optionalContext.timeHorizon);
    setShowOptionalFields(true);
  };

  const handleStartAnalysis = async () => {
    if (!decision.trim()) {
      setError("Please describe the decision you are considering.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: decision.trim(),
          reasoning: reasoning.trim(),
          optionalContext: {
            goals: goals.trim(),
            constraints: constraints.trim(),
            mattersMost: mattersMost.trim(),
            fears: fears.trim(),
            knowns: knowns.trim(),
            unknowns: unknowns.trim(),
            affectedPeople: affectedPeople.trim(),
            timeHorizon: timeHorizon.trim()
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result: CognitiveAnalysisResult = await response.json();
      onAnalysisComplete(result);
      onNavigate('reasoning-xray');
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError("Could not complete analysis through the reasoning engine. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Laboratory Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-0.5">
            DECISION LAB
          </h1>
        </div>

        {/* Example Loader button */}
        <button
          onClick={loadInternshipExample}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:bg-slate-800 hover:text-indigo-200 text-xs font-medium transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Play className="w-3 h-3 fill-indigo-400" />
          <span>Load 6-Month Internship Example</span>
        </button>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 my-8">
        {[
          { num: '01', title: 'DECISION' },
          { num: '02', title: 'REASONING' },
          { num: '03', title: 'CONTEXT' },
          { num: '04', title: 'ANALYSIS' }
        ].map((s, idx) => {
          const sNum = idx + 1;
          const isActive = step === sNum;
          const isDone = step > sNum;
          return (
            <button
              key={s.num}
              onClick={() => {
                if (sNum <= 3) setStep(sNum);
              }}
              className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : isDone
                  ? 'bg-slate-900/60 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-900/30 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-indigo-300 font-bold">
                  {s.num}
                </span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="text-xs sm:text-sm font-bold mt-1 truncate">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Error notification if any */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Workspace Forms */}
      <div className="rounded-2xl bg-[#11141e]/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
        {/* STEP 1: WHAT DECISION ARE YOU CONSIDERING? */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Step 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-['Space_Grotesk']">
                WHAT DECISION ARE YOU CONSIDERING?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                State the core fork in the road. Be as specific as you can.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="e.g. Should I accept this 6-month software engineering internship?"
                className="w-full px-4 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-slate-300">
                Tip: Phrasing as a binary choice or specific commitment works best.
              </span>
              <button
                onClick={() => {
                  if (!decision.trim()) {
                    setError("Please provide a decision before proceeding.");
                    return;
                  }
                  setError(null);
                  setStep(2);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Next: Your Reasoning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WHAT'S YOUR CURRENT REASONING? */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Step 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-['Space_Grotesk']">
                WHAT&apos;S YOUR CURRENT REASONING?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tell us why you&apos;re leaning toward one option, what looks appealing, and what you tell yourself when weighing it.
              </p>
            </div>

            <div>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                rows={6}
                placeholder="Tell us why you're leaning toward one option... E.g., The pay is solid, it's close to my apartment, a friend recommended it, and I want to gain production experience before graduation..."
                className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  setError(null);
                  setStep(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Next: Optional Context</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OPTIONAL CONTEXT */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Step 03 · Optional Context
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-['Space_Grotesk']">
                  SHARPEN THE RESOLUTION
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  The more peripheral context you supply, the deeper the blind spot detection. All fields are completely optional.
                </p>
              </div>

              <button
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 self-start sm:self-auto cursor-pointer"
              >
                <span>{showOptionalFields ? 'Hide extra fields' : 'Expand all fields'}</span>
                {showOptionalFields ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Goals
                </label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g. Secure full-time return offer"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hard Constraints
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g. Mandatory university classes on Tue/Thu"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What Matters Most
                </label>
                <input
                  type="text"
                  value={mattersMost}
                  onChange={(e) => setMattersMost(e.target.value)}
                  placeholder="e.g. High quality engineering mentorship"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What You Fear
                </label>
                <input
                  type="text"
                  value={fears}
                  onChange={(e) => setFears(e.target.value)}
                  placeholder="e.g. Burnout, tanking final semester GPA"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {showOptionalFields && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      What You Know for Sure
                    </label>
                    <input
                      type="text"
                      value={knowns}
                      onChange={(e) => setKnowns(e.target.value)}
                      placeholder="e.g. Stipend amount, office location, tech stack"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      What You Don&apos;t Know Yet
                    </label>
                    <input
                      type="text"
                      value={unknowns}
                      onChange={(e) => setUnknowns(e.target.value)}
                      placeholder="e.g. Mentor availability, overtime expectations"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Who Else is Affected?
                    </label>
                    <input
                      type="text"
                      value={affectedPeople}
                      onChange={(e) => setAffectedPeople(e.target.value)}
                      placeholder="e.g. Study group, capstone team, family"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Time Horizon
                    </label>
                    <input
                      type="text"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                      placeholder="e.g. Next 6 months + graduation timeline"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>REVEAL MY BLIND SPOTS</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COGNITIVE REASONING LOADING ANIMATION */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-[#0c0e14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#121622] border border-indigo-500/40 shadow-2xl text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 border-t-indigo-400 animate-spin" />
              <div className="w-full h-full flex items-center justify-center">
                <BrainCircuit className="w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
                Gemini Reasoning Engine Active
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Examining Cognitive Blind Spots
              </h3>
              <p className="text-sm text-cyan-300 font-mono mt-3 h-6 flex items-center justify-center">
                {loadingPhrases[loadingPhraseIndex]}
              </p>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
              Remember: The AI will never decide for you. It systematically examines assumptions, missing dimensions, and logic friction.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
