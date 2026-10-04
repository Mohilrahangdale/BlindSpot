import { CognitiveAnalysisResult } from '../types';

export const INTERNSHIP_DEMO_INPUT = {
  decision: "Should I accept a 6-month software engineering internship at a mid-stage logistics startup?",
  reasoning: "I'm leaning towards accepting. The stipend is $3,500/month which is solid for a student. The office is only 20 minutes from my apartment, so commuting is easy. I want to build real industry experience and resume credentials before graduating next year. My friend worked there and said the engineering team moves fast and uses modern TypeScript and React. Working hours are reported to be 9 to 6. It matches my career goal of becoming a full-stack engineer.",
  optionalContext: {
    goals: "Graduate with strong software engineering experience and a high chance of a full-time return offer.",
    constraints: "I still have two final semester university courses that require attendance on Tuesdays and Thursdays.",
    mattersMost: "High-quality engineering mentorship and practical architecture experience.",
    fears: "Being relegated to repetitive bug fixes or burning out while juggling college coursework.",
    knowns: "Stipend amount, office location, tech stack (TypeScript/React), 6-month duration.",
    unknowns: "Mentor allocation, specific project ownership, policy on university lecture conflict.",
    affectedPeople: "My study group and academic advisor.",
    timeHorizon: "Next 6 months (May to November), followed by final graduation."
  }
};

export const INTERNSHIP_DEMO_RESULT: CognitiveAnalysisResult = {
  id: "demo-internship-001",
  timestamp: Date.now(),
  decision: INTERNSHIP_DEMO_INPUT.decision,
  currentReasoning: INTERNSHIP_DEMO_INPUT.reasoning,
  optionalContext: INTERNSHIP_DEMO_INPUT.optionalContext,
  summary: "Your reasoning leans heavily toward convenience (20-min commute) and short-term tangible returns (stipend, resume bullet point). However, there is a critical blind spot around the academic conflict (Tuesday/Thursday lectures) and whether 'fast-moving startup' translates to structured mentorship or sink-or-swim triage.",
  overallCoverageScore: 68,
  coverage: [
    { id: "financial", name: "Financial", explored: true, score: 85, note: "Stipend ($3,500/mo) evaluated against student living needs." },
    { id: "career", name: "Career Growth", explored: true, score: 75, note: "Resume credentials identified, but mentorship quality remains unverified." },
    { id: "time", name: "Time & Schedule", explored: true, score: 55, note: "Commute is examined, but lecture overlap is largely unaddressed." },
    { id: "risk", name: "Risk Management", explored: false, score: 40, note: "Burnout and GPA impact are not accounted for in primary reasoning." },
    { id: "values", name: "Core Values", explored: true, score: 70, note: "Clear drive for skill acquisition and full-stack engineering." },
    { id: "longTerm", name: "Long-term Horizon", explored: false, score: 45, note: "Graduation timeline post-internship not deeply factored." },
    { id: "opportunityCost", name: "Opportunity Cost", explored: false, score: 35, note: "Did not evaluate alternative summer research or capstone projects." },
    { id: "reversibility", name: "Reversibility", explored: false, score: 50, note: "Contract exit clauses or reducing hours midway not checked." },
    { id: "social", name: "People & Relationships", explored: false, score: 40, note: "Study group commitments and professor relationships not quantified." },
    { id: "emotional", name: "Emotional & Energy", explored: false, score: 30, note: "Energy drain from 45hr workweeks + 2 academic courses missing." }
  ],
  drivers: [
    {
      id: "dr-1",
      factor: "Stipend ($3,500/month)",
      influence: "High",
      trustLabel: "FACT FROM YOU",
      detail: "You cited this as a major positive anchor for your decision."
    },
    {
      id: "dr-2",
      factor: "Proximity (20-minute commute)",
      influence: "High",
      trustLabel: "FACT FROM YOU",
      detail: "Convenience is serving as a strong emotional justification to lower perceived friction."
    },
    {
      id: "dr-3",
      factor: "Peer Validation ('Friend said it moves fast')",
      influence: "Medium",
      trustLabel: "INFERENCE",
      detail: "Your friend's single subjective experience may be substituting for objective due diligence on company culture."
    },
    {
      id: "dr-4",
      factor: "Resume Signaling for Graduation",
      influence: "High",
      trustLabel: "INFERENCE",
      detail: "You appear to prioritize having branded industry experience to de-risk post-grad job hunting."
    }
  ],
  notDiscussed: [
    {
      id: "nd-1",
      factor: "University Attendance Policy & Exam Collisions",
      whyItMatters: "A 9-6 on-site schedule directly conflicts with mandatory Tuesday/Thursday daytime university coursework.",
      suggestedQuestion: "How will your manager respond if midterm exams require 3 days away during sprint delivery?",
      trustLabel: "POSSIBILITY"
    },
    {
      id: "nd-2",
      factor: "Mentorship Bandwidth vs. Feature Factory",
      whyItMatters: "'Fast-moving startups' often lack senior engineering hours dedicated to junior code reviews and learning.",
      suggestedQuestion: "Has an explicit senior engineer been assigned as your weekly 1-on-1 mentor?",
      trustLabel: "QUESTION"
    },
    {
      id: "nd-3",
      factor: "Conversion Rate to Full-Time Return Offer",
      whyItMatters: "If your goal is a return offer, knowing whether this startup has headcount budget for 2027 grads is critical.",
      suggestedQuestion: "What percentage of past 6-month interns received verified full-time offers?",
      trustLabel: "QUESTION"
    }
  ],
  assumptions: [
    {
      id: "as-1",
      text: "The startup will easily accommodate daytime college classes without penalizing your performance evaluation.",
      whyItMatters: "If false, you face immediate friction between failing academic credits or underperforming at work.",
      howToVerify: "Request written confirmation from the hiring manager before signing the contract offer.",
      ifWrongImpact: "Severe stress, mandatory course retakes, or a damaged reputation at the startup.",
      trustLabel: "INFERENCE",
      status: "unreviewed"
    },
    {
      id: "as-2",
      text: "Working with modern React/TypeScript means you will learn scalable software architecture.",
      whyItMatters: "Modern tools can still be used to produce fragile technical debt if the team lacks engineering discipline.",
      howToVerify: "Ask the team lead during an informal call about their test coverage, CI/CD pipeline, and review rigor.",
      ifWrongImpact: "You might spend 6 months fixing glue code without learning production-grade engineering principles.",
      trustLabel: "POSSIBILITY",
      status: "unreviewed"
    },
    {
      id: "as-3",
      text: "A 6-month commitment is strictly necessary to obtain sufficient industry credibility.",
      whyItMatters: "3-month internships or part-time apprenticeships might offer 80% of the resume value with zero academic conflict.",
      howToVerify: "Review resume guidelines from senior alumni or university career services.",
      ifWrongImpact: "You lock yourself into an exhausting dual schedule for half a year unnecessarily.",
      trustLabel: "INFERENCE",
      status: "unreviewed"
    }
  ],
  inferredValues: [
    {
      id: "iv-1",
      value: "Practical Competence over Pure Academic Credentials",
      explanation: "You prioritize shipping production software with contemporary stacks over theoretical coursework.",
      trustLabel: "INFERENCE"
    },
    {
      id: "iv-2",
      value: "Autonomy and Financial Self-Sufficiency",
      explanation: "Earning a meaningful stipend reinforces independence and self-reliance while completing university.",
      trustLabel: "INFERENCE"
    },
    {
      id: "iv-3",
      value: "Risk Mitigation via Early Signaling",
      explanation: "You want tangible proof of capability before stepping into the competitive post-graduation job market.",
      trustLabel: "INFERENCE"
    }
  ],
  radarDimensions: [
    {
      id: "financial",
      name: "Financial",
      dimension: "Financial",
      exploredLevel: 85,
      whyItMatters: "Ensures compensation covers expenses, tuition offsets, and provides adequate safety.",
      whatYouConsidered: "Solid $3,500/month stipend and minimal commute cost.",
      whatMayBeMissing: "Tax withholdings, potential cost of extending graduation by one semester.",
      questionToExplore: "If extending a college semester costs $4,000 in tuition, does the stipend still yield a positive net financial outcome?"
    },
    {
      id: "career",
      name: "Career Growth",
      dimension: "Career",
      exploredLevel: 75,
      whyItMatters: "Steers your trajectory toward high-leverage engineering capabilities.",
      whatYouConsidered: "Full-stack aspirations, modern TypeScript & React stack.",
      whatMayBeMissing: "Actual seniority of code reviewers and breadth of system design exposure.",
      questionToExplore: "Will you be pair-programming with staff engineers or mostly left alone on isolated front-end tickets?"
    },
    {
      id: "time",
      name: "Time & Schedule",
      dimension: "Time",
      exploredLevel: 55,
      whyItMatters: "Protects your physical capacity and prevents acute burnout.",
      whatYouConsidered: "9-to-6 schedule and 20-minute proximity.",
      whatMayBeMissing: "Direct conflict with Tuesday/Thursday university class schedules and study hours.",
      questionToExplore: "How many net hours per week will remain for sleep, coursework, and mental recharge?"
    },
    {
      id: "risk",
      name: "Risk Management",
      dimension: "Risk",
      exploredLevel: 40,
      whyItMatters: "Prepares contingency paths if company dynamics or academic pressures worsen.",
      whatYouConsidered: "Basic enthusiasm and peer endorsement.",
      whatMayBeMissing: "Possibility of startup runway issues, layoff risk, or academic probation.",
      questionToExplore: "What is your fallback plan if mid-term exams collide with a critical product launch deadline?"
    },
    {
      id: "emotional",
      name: "Emotional & Energy",
      dimension: "Emotional",
      exploredLevel: 30,
      whyItMatters: "Sustained high performance requires baseline emotional equilibrium.",
      whatYouConsidered: "Excitement about entering the tech industry.",
      whatMayBeMissing: "The psychological toll of perpetual cognitive switching between school and corporate deadlines.",
      questionToExplore: "How do you typically handle chronic high-pressure environments over sustained 6-month cycles?"
    },
    {
      id: "social",
      name: "Social & Community",
      dimension: "Social",
      exploredLevel: 40,
      whyItMatters: "College networks and peer relationships are foundational long-term assets.",
      whatYouConsidered: "One friend's positive referral.",
      whatMayBeMissing: "Impact on your campus study group and final-year student activities.",
      questionToExplore: "Will withdrawing from campus life for 6 months weaken relationships that could matter for future collaborations?"
    },
    {
      id: "longTerm",
      name: "Long-term Horizon",
      dimension: "Long-term",
      exploredLevel: 45,
      whyItMatters: "Ensures today's tactical win doesn't compromise 3-year strategic positioning.",
      whatYouConsidered: "Graduating next year with relevant work history.",
      whatMayBeMissing: "How this specific logistics domain brand is perceived by tier-1 engineering companies.",
      questionToExplore: "Does working at a logistics startup position you uniquely, or does it narrow your early domain options?"
    },
    {
      id: "opportunityCost",
      name: "Opportunity Cost",
      dimension: "Opportunity Cost",
      exploredLevel: 35,
      whyItMatters: "Every accepted option automatically forfeits all other possibilities for 6 full months.",
      whatYouConsidered: "The immediate offer in front of you.",
      whatMayBeMissing: "Alternative summer internships, open-source portfolio development, or focused interview prep for top-tier firms.",
      questionToExplore: "If you declined this offer, what is the single highest-leverage alternative project you would commit to?"
    },
    {
      id: "values",
      name: "Core Values",
      dimension: "Values",
      exploredLevel: 70,
      whyItMatters: "Aligns your everyday labor with personal identity and intrinsic motivation.",
      whatYouConsidered: "Desire for building real products and gaining autonomy.",
      whatMayBeMissing: "Whether the company's culture respects work-life boundaries.",
      questionToExplore: "Does the rapid-fire startup environment align with your natural learning tempo, or do you thrive with methodical depth?"
    },
    {
      id: "reversibility",
      name: "Reversibility",
      dimension: "Reversibility",
      exploredLevel: 50,
      whyItMatters: "Two-way door decisions allow safe retreat; one-way door decisions demand rigorous defense.",
      whatYouConsidered: "Fixed 6-month expectation.",
      whatMayBeMissing: "Contractual early termination terms, 3-month review checkpoint.",
      questionToExplore: "Can you negotiate an initial 3-month trial with an explicit mutual renewal clause?"
    }
  ],
  logicFrictions: [
    {
      id: "lf-1",
      statedValue: "Desire for high-quality engineering mentorship",
      actualEmphasis: "Fast-moving early startup where everyone has immediate deadlines",
      tensionExplanation: "Startups that 'move fast' often prize shipping velocity over teaching junior engineers disciplined architectural fundamentals.",
      neutralQuestion: "If you discover after 3 weeks that nobody has time to review your pull requests in depth, how will you protect your learning curve?",
      trustLabel: "INFERENCE"
    },
    {
      id: "lf-2",
      statedValue: "Convenient 20-minute commute to minimize daily friction",
      actualEmphasis: "Dual-commitment schedule with on-campus Tuesday/Thursday classes",
      tensionExplanation: "Commute convenience vanishes if you must commute back and forth between campus and the startup office twice a week.",
      neutralQuestion: "Have you calculated the door-to-door transit time between the university lecture hall and the startup office?",
      trustLabel: "QUESTION"
    }
  ],
  informationGaps: {
    known: [
      "Stipend rate: $3,500/month",
      "Office location: 20 minutes from apartment",
      "Nominal office hours: 9:00 AM - 6:00 PM",
      "Primary engineering tools: TypeScript, React",
      "Friend's positive personal endorsement"
    ],
    uncertain: [
      "Actual overtime frequency and weekend expectations",
      "Willingness of the manager to accommodate lecture hours",
      "Direct mentor's teaching style and availability",
      "Full-time conversion headcount for the upcoming fiscal year"
    ],
    assumed: [
      "The academic workload will easily fit into evening and weekend hours",
      "The friend's positive experience reflects the current team structure",
      "6 continuous months is superior to a 3-month summer commitment"
    ],
    missing: [
      "Written policy regarding academic scheduling flexibility",
      "Past intern retention and hiring conversion rate data",
      "Code review standards and CI/CD automated pipeline maturity"
    ],
    highestValueUnknown: {
      whatToFindOut: "Written agreement on Tuesday/Thursday academic schedule accommodations.",
      howToVerify: "Email the engineering manager: 'I am excited about this offer. To ensure I fulfill all responsibilities, I need to attend two classes on Tue/Thu between 11 AM-2 PM. Can we formalize how we flex those hours?'",
      whyItMatters: "This single unknown determines whether the internship is sustainable or will derail your college graduation."
    }
  },
  perspectives: [
    {
      id: "p-future-me",
      role: "Future Me (1 Year Post-Graduation)",
      icon: "UserCheck",
      tagline: "Looking back after entering the job market",
      perspectiveSummary: "Future You cares far less about the $3,500 monthly stipend and far more about whether you built a deep portfolio project or burned out your final GPA.",
      questions: [
        "Did this role give me demonstrable system design stories for technical interviews?",
        "Did my academic standing or graduation date suffer as a result of overcommitting?"
      ],
      simulationDisclaimer: "Simulated perspective based on common post-graduate alumni retrospective evaluations."
    },
    {
      id: "p-mentor",
      role: "Senior Engineering Mentor",
      icon: "GraduationCap",
      tagline: "Evaluating technical depth and compounding skills",
      perspectiveSummary: "A seasoned engineer looks past the shiny tech stack to examine code craftsmanship, testing standards, and feedback frequency.",
      questions: [
        "Will you be writing automated unit and integration tests, or just hacking together UI components?",
        "Who is the most experienced engineer on that team, and what is their daily involvement with you?"
      ],
      simulationDisclaimer: "Simulated perspective modeled on staff-level engineering leadership principles."
    },
    {
      id: "p-recruiter",
      role: "Tech Recruiter at Tier-1 Firm",
      icon: "Briefcase",
      tagline: "Assessing resume signal strength",
      perspectiveSummary: "Recruiters look at measurable impact and company reputation rather than how close the office was to your apartment.",
      questions: [
        "Can you quantify business metrics on your resume (e.g. reduced load time by 40%, shipped feature used by 10k users)?",
        "How well known is this logistics startup outside its immediate geographical niche?"
      ],
      simulationDisclaimer: "Simulated perspective modeled on technical talent acquisition screening habits."
    },
    {
      id: "p-skeptic",
      role: "Neutral Skeptic",
      icon: "ShieldAlert",
      tagline: "Stress-testing your best-case assumptions",
      perspectiveSummary: "The skeptic assumes that 'moving fast' is code for understaffed chaos where junior interns absorb grunt work.",
      questions: [
        "What happens if the primary engineer leaves or is overwhelmed with quarterly deliverables?",
        "Why is this company hiring a 6-month intern instead of a full-time mid-level engineer?"
      ],
      simulationDisclaimer: "Simulated devil's-advocate perspective designed to detect survivorship bias."
    },
    {
      id: "p-family",
      role: "Family / Close Support",
      icon: "HeartHandshake",
      tagline: "Monitoring well-being and health boundaries",
      perspectiveSummary: "Those close to you care about your mental stamina, sleep schedule, and joy during your final college year.",
      questions: [
        "Will you have energy left for friendships, health, and campus milestones you will never get back?",
        "Are you taking this out of excitement, or out of anxious pressure to prove yourself immediately?"
      ],
      simulationDisclaimer: "Simulated holistic wellness perspective focusing on relational and health equilibrium."
    }
  ],
  counterfactuals: [
    {
      id: "cf-1",
      alteredFactor: "Stipend reduced by 50% ($1,750/month)",
      prompt: "What if the stipend were reduced to $1,750/month, barely covering living expenses?",
      whyThisTestsReasoning: "Tests whether the financial reward is masking deficiencies in mentorship or learning quality.",
      userAnswer: "NOT_SURE"
    },
    {
      id: "cf-2",
      alteredFactor: "Strict 100% on-site presence required with no lecture leave",
      prompt: "What if the startup required 100% on-site presence from 9 AM to 6 PM with zero allowance for university lectures?",
      whyThisTestsReasoning: "Forces an explicit confrontation between your academic degree timeline and corporate commitment.",
      userAnswer: "NO"
    },
    {
      id: "cf-3",
      alteredFactor: "Your friend's referral was removed",
      prompt: "What if you had no friend who worked there and had to judge purely based on objective interview impressions?",
      whyThisTestsReasoning: "Exposes whether peer familiarity created an unearned halo effect around the company's culture.",
      userAnswer: "NOT_SURE"
    },
    {
      id: "cf-4",
      alteredFactor: "Duration reduced to 3 summer months",
      prompt: "What if the offer was strictly for 3 summer months with zero semester overlap?",
      whyThisTestsReasoning: "Tests whether the 6-month span is an intrinsic benefit or an accidental burden.",
      userAnswer: "YES"
    }
  ],
  whatWouldChangeYourMind: [
    {
      id: "cm-1",
      information: "Written guarantee from the engineering manager permitting 6 flexible hours weekly for daytime lectures.",
      whyItMatters: "Directly resolves your biggest structural constraint without endangering academic progress.",
      howToVerify: "Send a polite clarifying email with your course syllabus schedule before signing.",
      possibleImpact: "High - converts an existential academic risk into a managed operational agreement.",
      status: "UNKNOWN"
    },
    {
      id: "cm-2",
      information: "Discovery that the last two interns spent 80% of their time manually tagging data or updating docs.",
      whyItMatters: "Nullifies your primary goal of developing advanced full-stack engineering competency.",
      howToVerify: "Search LinkedIn for past interns from this firm and message them for a 10-minute candid phone chat.",
      possibleImpact: "Critical - would make declining the offer the rational choice.",
      status: "UNKNOWN"
    },
    {
      id: "cm-3",
      information: "Confirmation that the company has 3 approved budget slots for junior full-time hires next year.",
      whyItMatters: "Validates that the 6-month investment offers a realistic conversion pathway to post-grad security.",
      howToVerify: "Ask the hiring manager or recruiter directly: 'How many interns did you extend full-time offers to in 2025/2026?'",
      possibleImpact: "High - drastically increases the expected value of accepting.",
      status: "UNKNOWN"
    },
    {
      id: "cm-4",
      information: "An alternative offer from a campus research lab paying $2,500/month with complete schedule flexibility.",
      whyItMatters: "Provides an immediate benchmark for your opportunity cost.",
      howToVerify: "Check with your department chair or research faculty.",
      possibleImpact: "Medium - provides leverage and a low-stress contingency.",
      status: "UNKNOWN"
    }
  ],
  preMortem: {
    failureScenario: {
      title: "The Burnout Spiral & Academic Scramble",
      description: "Six months from now, you feel exhausted. A critical product deadline in Month 3 coincided with midterm exams, forcing you to skip lectures. Your university GPA dropped, and the startup's senior engineer was too overwhelmed to mentor you, leaving you fixing front-end CSS bugs in isolation.",
      causes: [
        "Unwritten verbal assumptions regarding class flexibility were forgotten during high-stress sprint deadlines.",
        "Underestimating the mental fatigue of dual-context switching between university and corporate work.",
        "Lack of a formal mentorship syllabus or dedicated senior pair-programming time."
      ],
      earlyWarningSigns: [
        "Week 2: Nobody schedules an onboarding review or 1-on-1 check-in.",
        "Week 4: You find yourself studying for university exams past midnight on workdays.",
        "Week 6: Pull requests sit unreviewed for 4+ days."
      ]
    },
    successScenario: {
      title: "The Compounding Accelerator",
      description: "Six months from now, you have shipped two production-facing micro-features in React and Node.js, earned the respect of senior leadership, maintained a 3.7 GPA with structured flex hours, and received a written return offer before graduation.",
      requiredConditions: [
        "Pre-negotiated, documented calendar blocks for class attendance.",
        "A designated senior mentor who commits to two 30-minute code review sessions each week.",
        "Explicit quarterly milestone deliverables agreed upon during Week 1."
      ],
      amplifyingActions: [
        "Publish an internal weekly recap email summarizing what you learned and delivered.",
        "Proactively ask for code architecture feedback before implementing complex components."
      ]
    }
  },
  opportunityCosts: [
    {
      id: "oc-1",
      category: "Time",
      whatYouGiveUp: "Approximately 800 hours over 6 months dedicated to work and transit.",
      tradeoffExplanation: "Those hours cannot be spent on capstone engineering projects, deep interview algorithmic practice (LeetCode), or physical recovery.",
      trustLabel: "POSSIBILITY"
    },
    {
      id: "oc-2",
      category: "Learning",
      whatYouGiveUp: "Deep academic mastery in your two elective university courses.",
      tradeoffExplanation: "You may shift into survival mode (just passing exams) rather than mastering core theory.",
      trustLabel: "POSSIBILITY"
    },
    {
      id: "oc-3",
      category: "Alternative Opportunities",
      whatYouGiveUp: "The ability to apply for late-spring or summer 3-month internships at larger tech companies.",
      tradeoffExplanation: "Committing for 6 months locks your calendar and removes you from the open recruitment market.",
      trustLabel: "POSSIBILITY"
    },
    {
      id: "oc-4",
      category: "Flexibility",
      whatYouGiveUp: "The freedom to travel or manage spontaneous student life during your final college year.",
      tradeoffExplanation: "Corporate attendance demands rigid punctuality, eliminating last-minute study sessions or trips.",
      trustLabel: "POSSIBILITY"
    }
  ],
  experiments: [
    {
      id: "ex-1",
      testedAssumption: "The engineering team has time and enthusiasm to mentor a student intern.",
      smallTest: "Send a polite LinkedIn message to a current mid-level software engineer on the team asking for a 15-minute coffee chat or call.",
      whatYouLearn: "Whether engineers are approachable and communicative or defensive, hurried, and burned out.",
      whatItCouldChange: "If they seem stressed and unresponsive, it signals that mentorship may be nonexistent."
    },
    {
      id: "ex-2",
      testedAssumption: "Class schedule flexibility is standard and non-contentious.",
      smallTest: "Email the hiring manager a precise weekly calendar proposal with shaded blocks for Tue/Thu lectures, asking if this exact structure works.",
      whatYouLearn: "Their immediate institutional reaction to concrete boundary-setting.",
      whatItCouldChange: "If they hesitate or ask you to drop classes, you prevent months of academic turmoil before signing."
    },
    {
      id: "ex-3",
      testedAssumption: "The work involves meaningful technical challenges rather than trivial maintenance.",
      smallTest: "Ask the team lead: 'Could you share an example of a feature an intern built in the last cycle, from initial spec to deployment?'",
      whatYouLearn: "Whether past interns owned real features or were given throwaway tasks.",
      whatItCouldChange: "Prevents accepting an offer that fails to advance your full-stack engineering portfolio."
    }
  ],
  reflectionQuestions: [
    "Which unverified assumption makes you most nervous if it turns out to be false?",
    "If you could only find out one more fact before accepting or declining, what would that fact be?",
    "Are you choosing this primarily because it is convenient and safe, or because it actively accelerates your 3-year vision?",
    "What is the worst realistic outcome, and what is your concrete step-by-step contingency plan?",
    "If both this opportunity and a lighter 10-hour/week research assistantship offered the same stipend, which would you pick?"
  ],
  beforeVsAfter: {
    originalReasoningSummary: "Initially viewed primarily through the lens of a solid $3,500/month stipend, a convenient 20-minute commute, and generic resume prestige.",
    expandedFactors: [
      "Direct structural collision between 9-6 on-site expectations and Tue/Thu university lectures.",
      "The critical difference between a 'fast-moving startup' and genuine engineering mentorship.",
      "Opportunity cost of committing 6 full months versus a focused 3-month summer engagement.",
      "Long-term full-time return offer probability versus short-term resume signaling."
    ],
    clarifiedAssumptions: [
      "Identified that schedule flexibility cannot be assumed—it must be put into written contract terms.",
      "Recognized that peer validation from one friend does not guarantee high code-review rigor.",
      "Clarified that convenience is an emotional reducer of perceived risk, not a guarantee of learning."
    ],
    remainingUncertainties: [
      "The exact headcount budget for post-graduation full-time hiring in 2027.",
      "The team lead's true willingness to protect junior learning time during crunch periods."
    ],
    unansweredQuestions: [
      "Will the manager sign off on a written schedule accommodation?",
      "Can the contract be structured with a 3-month mutual check-in review?"
    ]
  }
};

export const QUICK_TEMPLATES = [
  {
    id: "internship",
    icon: "Briefcase",
    title: "Internship Offer",
    category: "Career",
    prompt: "Should I accept a 6-month software engineering internship at a mid-stage startup?",
    reasoning: "The stipend is $3,500/month and the commute is 20 minutes. I want to build real industry experience before graduating, but I still have two classes to finish."
  },
  {
    id: "education",
    icon: "GraduationCap",
    title: "Degree vs Bootcamp",
    category: "Education",
    prompt: "Should I pursue a 2-year Master's in Computer Science or a 6-month intensive AI Engineering bootcamp?",
    reasoning: "The Master's costs $45,000 and takes 2 years, but has prestige. The bootcamp is $12,000 and faster, but I don't know if recruiters will take it as seriously."
  },
  {
    id: "business",
    icon: "Rocket",
    title: "Quit Job for Startup",
    category: "Business",
    prompt: "Should I leave my stable corporate engineering job to work full-time on my B2B SaaS startup?",
    reasoning: "We have 12 pilot users and $800 MRR. I have 9 months of personal runway saved up. Staying at my job feels slow, but leaving means forfeiting benefits and salary."
  },
  {
    id: "finance",
    icon: "Coins",
    title: "Home Purchase vs Renting",
    category: "Finance",
    prompt: "Should I buy a 2-bedroom condo now or continue renting and investing in index funds?",
    reasoning: "Mortgage rates are high (6.5%), but rents are also increasing 7% annually. I have the down payment ready, but buying ties down 60% of my liquid net worth."
  },
  {
    id: "moving",
    icon: "MapPin",
    title: "Relocate to Tech Hub",
    category: "Moving / Lifestyle",
    prompt: "Should I relocate from my hometown to a major tech hub city for in-person networking?",
    reasoning: "My current remote job pays well and cost of living is low, but I feel isolated from the startup ecosystem and ambitious peers. Moving will double my rent."
  },
  {
    id: "personal",
    icon: "Heart",
    title: "Career Pivot to Design",
    category: "Personal",
    prompt: "Should I transition from Product Management into Product Design?",
    reasoning: "I love crafting visual interfaces and user experiences more than writing PRDs and stakeholder management, but I fear taking a 20% initial salary drop."
  }
];
