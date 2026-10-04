export type TrustLabel = 'FACT FROM YOU' | 'INFERENCE' | 'POSSIBILITY' | 'QUESTION';

export interface CoverageItem {
  id: string;
  name: string;
  explored: boolean;
  score: number; // 0 to 100
  note: string;
}

export interface DriverFactor {
  id: string;
  factor: string;
  influence: 'High' | 'Medium' | 'Low';
  trustLabel: TrustLabel;
  detail: string;
}

export interface NotDiscussedFactor {
  id: string;
  factor: string;
  whyItMatters: string;
  suggestedQuestion: string;
  trustLabel: TrustLabel;
}

export interface AssumptionItem {
  id: string;
  text: string;
  whyItMatters: string;
  howToVerify: string;
  ifWrongImpact: string;
  trustLabel: TrustLabel;
  status?: 'relevant' | 'disagreed' | 'unreviewed';
  userFeedback?: string;
}

export interface InferredValue {
  id: string;
  value: string;
  explanation: string;
  trustLabel: TrustLabel;
}

export interface RadarDimension {
  id: string;
  name: string;
  dimension: string;
  exploredLevel: number; // 0 to 100
  whyItMatters: string;
  whatYouConsidered: string;
  whatMayBeMissing: string;
  questionToExplore: string;
}

export interface LogicFrictionItem {
  id: string;
  statedValue: string;
  actualEmphasis: string;
  tensionExplanation: string;
  neutralQuestion: string;
  trustLabel: TrustLabel;
}

export interface InformationGapMap {
  known: string[];
  uncertain: string[];
  assumed: string[];
  missing: string[];
  highestValueUnknown: {
    whatToFindOut: string;
    howToVerify: string;
    whyItMatters: string;
  };
}

export interface PerspectiveView {
  id: string;
  role: string; // 'Future Me' | 'Mentor' | 'Recruiter' | 'Family' | 'Neutral Skeptic' | 'Me in 5 Years' | 'Future Employer';
  icon: string;
  tagline: string;
  perspectiveSummary: string;
  questions: string[];
  simulationDisclaimer: string;
}

export interface CounterfactualItem {
  id: string;
  alteredFactor: string;
  prompt: string;
  whyThisTestsReasoning: string;
  userAnswer?: 'YES' | 'NO' | 'NOT_SURE';
  userReason?: string;
}

export interface WhatWouldChangeYourMindItem {
  id: string;
  information: string;
  whyItMatters: string;
  howToVerify: string;
  possibleImpact: string;
  status: 'KNOWN' | 'UNKNOWN' | 'NOT_RELEVANT';
}

export interface PreMortemAnalysis {
  failureScenario: {
    title: string;
    description: string;
    causes: string[];
    earlyWarningSigns: string[];
  };
  successScenario: {
    title: string;
    description: string;
    requiredConditions: string[];
    amplifyingActions: string[];
  };
}

export interface OpportunityCostItem {
  id: string;
  category: 'Time' | 'Money' | 'Learning' | 'Alternative Opportunities' | 'Flexibility' | 'Relationships' | 'Future Options';
  whatYouGiveUp: string;
  tradeoffExplanation: string;
  trustLabel: TrustLabel;
}

export interface DecisionExperiment {
  id: string;
  testedAssumption: string;
  smallTest: string;
  whatYouLearn: string;
  whatItCouldChange: string;
}

export interface BeforeVsAfterComparison {
  originalReasoningSummary: string;
  expandedFactors: string[];
  clarifiedAssumptions: string[];
  remainingUncertainties: string[];
  unansweredQuestions: string[];
}

export interface CognitiveAnalysisResult {
  id: string;
  timestamp: number;
  decision: string;
  currentReasoning: string;
  optionalContext?: {
    goals?: string;
    constraints?: string;
    mattersMost?: string;
    fears?: string;
    knowns?: string;
    unknowns?: string;
    affectedPeople?: string;
    timeHorizon?: string;
  };
  summary: string;
  coverage: CoverageItem[];
  overallCoverageScore: number;
  drivers: DriverFactor[];
  notDiscussed: NotDiscussedFactor[];
  assumptions: AssumptionItem[];
  inferredValues: InferredValue[];
  radarDimensions: RadarDimension[];
  logicFrictions: LogicFrictionItem[];
  informationGaps: InformationGapMap;
  perspectives: PerspectiveView[];
  counterfactuals: CounterfactualItem[];
  whatWouldChangeYourMind: WhatWouldChangeYourMindItem[];
  preMortem: PreMortemAnalysis;
  opportunityCosts: OpportunityCostItem[];
  experiments: DecisionExperiment[];
  reflectionQuestions: string[];
  userReflections?: Record<number, string>;
  beforeVsAfter: BeforeVsAfterComparison;
  personalNotes?: string;
  isSecondAnalysis?: boolean;
}

export type ViewScreen = 
  | 'landing'
  | 'command-center'
  | 'decision-lab'
  | 'reasoning-xray'
  | 'blind-spot-radar'
  | 'assumption-auditor'
  | 'logic-friction'
  | 'information-gap'
  | 'perspective-switchboard'
  | 'counterfactual-mirror'
  | 'change-mind'
  | 'pre-mortem'
  | 'opportunity-cost'
  | 'experiments'
  | 'reflection-mode'
  | 'before-after'
  | 'thinking-map'
  | 'decision-journal';
