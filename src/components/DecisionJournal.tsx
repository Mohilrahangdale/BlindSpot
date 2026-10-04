import React, { useState } from 'react';
import { 
  BookMarked, 
  ArrowRight, 
  Trash2, 
  Calendar, 
  Sparkles, 
  PlusCircle, 
  FileText, 
  Save, 
  Eye, 
  Download
} from 'lucide-react';
import { CognitiveAnalysisResult, ViewScreen } from '../types';

interface DecisionJournalProps {
  journalEntries: CognitiveAnalysisResult[];
  activeAnalysis: CognitiveAnalysisResult | null;
  onLoadEntry: (entry: CognitiveAnalysisResult) => void;
  onDeleteEntry: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const DecisionJournal: React.FC<DecisionJournalProps> = ({
  journalEntries,
  activeAnalysis,
  onLoadEntry,
  onDeleteEntry,
  onUpdateNotes,
  onNavigate
}) => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(
    journalEntries[0]?.id || activeAnalysis?.id || null
  );

  const [personalNoteText, setPersonalNoteText] = useState<string>('');

  const selectedEntry = journalEntries.find(e => e.id === selectedEntryId) || activeAnalysis;

  const handleSaveNotes = () => {
    if (!selectedEntry) return;
    onUpdateNotes(selectedEntry.id, personalNoteText);
  };

  const handleExportSummary = (entry: CognitiveAnalysisResult) => {
    const textData = `
THE BLIND SPOT — COGNITIVE DECISION SUMMARY
Date: ${new Date(entry.timestamp).toLocaleString()}

DECISION:
${entry.decision}

ORIGINAL REASONING:
${entry.currentReasoning}

THINKING COVERAGE:
${entry.overallCoverageScore}% across 10 dimensions

CHIEF BLIND SPOT SUMMARY:
${entry.summary}

PRIMARY UNSTATED ASSUMPTIONS:
${entry.assumptions.map((a, i) => `${i + 1}. ${a.text} (Verification: ${a.howToVerify})`).join('\n')}

HIGHEST-VALUE UNKNOWN:
What to find out: ${entry.informationGaps.highestValueUnknown.whatToFindOut}
How to verify: ${entry.informationGaps.highestValueUnknown.howToVerify}

PRE-MORTEM ROOT CAUSES (IF IT WENT WRONG):
${entry.preMortem.failureScenario.causes.map((c, i) => `- ${c}`).join('\n')}

EXPANDED PERSPECTIVE:
- Stated factors: ${entry.beforeVsAfter?.expandedFactors?.join(', ') || 'N/A'}
- Clarified assumptions: ${entry.beforeVsAfter?.clarifiedAssumptions?.join(', ') || 'N/A'}

PERSONAL REFLECTION NOTES:
${entry.personalNotes || 'None recorded yet.'}

"The AI didn't make the decision. It made the thinking better."
`;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blind-spot-${entry.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5" />
            Local Repository
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            DECISION JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Review past cognitive examinations, track how your thinking evolved, and attach final personal notes. Saved safely in your local browser storage.
          </p>
        </div>

        <button
          onClick={() => onNavigate('decision-lab')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Decision</span>
        </button>
      </div>

      {journalEntries.length === 0 && !activeAnalysis ? (
        <div className="p-12 text-center rounded-3xl bg-[#11141e]/80 border border-slate-800 space-y-4">
          <BookMarked className="w-10 h-10 text-slate-600 mx-auto" />
          <h2 className="text-lg font-bold text-white">Your Decision Journal is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Once you analyze a decision in the Decision Lab or load the Demo, you can archive your session here with complete reflection history.
          </p>
          <button
            onClick={() => onNavigate('command-center')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Go to Command Center
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Entries List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Saved Thinking Sessions ({journalEntries.length})
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {journalEntries.map((entry) => {
                const isSelected = selectedEntry?.id === entry.id;
                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntryId(entry.id);
                      setPersonalNoteText(entry.personalNotes || '');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-indigo-950/30 border-indigo-500/50 shadow-lg'
                        : 'bg-[#121622]/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-cyan-300 font-bold">
                        {entry.overallCoverageScore}% Coverage
                      </span>
                    </div>

                    <h2 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                      {entry.decision}
                    </h2>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadEntry(entry);
                          onNavigate('reasoning-xray');
                        }}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect in Lab</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteEntry(entry.id);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Entry Inspector & Personal Notes */}
          {selectedEntry && (
            <div className="lg:col-span-7 space-y-6">
              <div className="p-7 rounded-3xl bg-[#121622] border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">
                      Archived Session Details
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                      {selectedEntry.decision}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleExportSummary(selectedEntry)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium self-start sm:self-auto cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Summary (.txt)</span>
                  </button>
                </div>

                {/* Original Reasoning */}
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                    Initial Reasoning
                  </div>
                  <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    &ldquo;{selectedEntry.currentReasoning}&rdquo;
                  </p>
                </div>

                {/* Blind Spot Summary */}
                <div>
                  <div className="text-[10px] font-mono uppercase text-cyan-300 font-bold mb-1">
                    Chief Blind Spot Diagnosed
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/20">
                    {selectedEntry.summary}
                  </p>
                </div>

                {/* Key Assumptions audit */}
                <div>
                  <div className="text-[10px] font-mono uppercase text-purple-300 font-bold mb-2">
                    Key Assumptions Audited ({selectedEntry.assumptions.length})
                  </div>
                  <div className="space-y-1.5">
                    {selectedEntry.assumptions.map((asmp, i) => (
                      <div key={i} className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
                        <span className="font-semibold text-slate-200">#{i + 1}: </span>
                        <span>{asmp.text}</span>
                        {asmp.userFeedback && (
                          <div className="text-[11px] text-indigo-300 mt-1 pl-2 border-l border-indigo-500/40">
                            Note: {asmp.userFeedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Notes Section */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      Personal Final Notes &amp; Conclusion
                    </span>
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Notes</span>
                    </button>
                  </div>

                  <textarea
                    value={personalNoteText || selectedEntry.personalNotes || ''}
                    onChange={(e) => setPersonalNoteText(e.target.value)}
                    placeholder="Record your final personal verdict, chosen experiment, or next action step..."
                    rows={4}
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
