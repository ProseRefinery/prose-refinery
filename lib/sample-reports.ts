// Sample report content for web pages
// Anonymised examples showing report format and depth

export interface ActionStep {
    what: string;
    why: string;
    success: string;
}

export interface SampleReport {
    id: string;
    tier: 1 | 3;
    tierName: string;
    title: string;
    subtitle: string;
    date: string;
    price: string;
    turnaround: string;
    summary: {
        riskLevel: 'Low' | 'Moderate' | 'High';
        failureZone: string;
        recommendedTier: string;
        revisionPriority: string[];
    };
    failureZoneAnalysis: string[];
    actionSteps: ActionStep[];
    deliverables: string[];
    footer: string;
}

export const SAMPLE_REPORTS: Record<string, SampleReport> = {
    'tier1-sample': {
        id: 'tier1-sample',
        tier: 1,
        tierName: 'Story Integrity Diagnostic™',
        title: 'Opening Pages Structural Diagnostic',
        subtitle: 'Sample excerpt. Details anonymised. Structural analysis only.',
        date: 'Sample Report',
        price: '£95 – £175',
        turnaround: '48 hours',
        summary: {
            riskLevel: 'Moderate',
            failureZone: 'Pacing & Pressure',
            recommendedTier: 'Single-Pillar Structural Audit',
            revisionPriority: [
                'Address scene turn structure before revising prose',
                'Add consequence delivery at chapter endings',
                'Clarify protagonist goal by page 3'
            ]
        },
        failureZoneAnalysis: [
            'Your opening pages establish setting and character competently, but the narrative pressure dissipates after the inciting incident. Scenes end on summary rather than changed situations, which resets tension instead of building it.',
            'The protagonist\'s goal is implied but not stated directly, which makes the reader work harder to understand the stakes. By page 5, we should know what they want and what prevents them from getting it.'
        ],
        actionSteps: [
            {
                what: 'Rewrite scene endings to show changed situations',
                why: 'Currently scenes end on reflection. This bleeds tension. Readers need to feel that something is different after each scene.',
                success: 'Each scene ends with a decision, consequence, or revelation that changes the protagonist\'s options.'
            },
            {
                what: 'Move goal statement to first chapter',
                why: 'Delayed goal statements make openings feel aimless. Readers tolerate uncertainty for about 3 pages.',
                success: 'By the end of chapter one, readers can articulate what the protagonist wants and why it matters.'
            },
            {
                what: 'Add physical constraint to the opening scene',
                why: 'The setting exists but does not pressure the character. Constraint creates urgency.',
                success: 'The protagonist must navigate the environment, not just observe it.'
            }
        ],
        deliverables: [
            'Structural Risk Level assessment',
            'Primary Failure Zone identification',
            'Revision Priority Order (3 items)',
            'Failure Zone Analysis (2 paragraphs)',
            '3 Action Steps with What/Why/Success',
            'Recommended next tier'
        ],
        footer: 'This diagnostic addresses structural integrity of opening pages. It does not provide line-level edits, proofreading, or prose stylisation. Full reports include additional context based on manuscript specifics.'
    },
    'tier3-sample': {
        id: 'tier3-sample',
        tier: 3,
        tierName: 'Full Structural Edit',
        title: 'Complete Manuscript Structural Assessment',
        subtitle: 'Sample excerpt. Details anonymised. This shows format and depth; full reports include 15-25 pages.',
        date: 'Sample Report',
        price: '£1,500 – £4,500',
        turnaround: '3–4 weeks',
        summary: {
            riskLevel: 'High',
            failureZone: 'Plot Architecture',
            recommendedTier: 'Full Structural Edit (in progress)',
            revisionPriority: [
                'Repair consequence chain in Act 2 (scenes 14-28)',
                'Strengthen protagonist pressure escalation',
                'Consolidate world-system rules for consistency',
                'Rebuild midpoint as point of no return'
            ]
        },
        failureZoneAnalysis: [
            'The manuscript shows strong individual scenes and competent prose, but the overall plot architecture is not carrying weight. Consequences from Act 1 are not translating into complications in Act 2. The causal chain breaks at approximately the 30% mark and does not reconnect until the climax.',
            'This creates a "sagging middle" effect where scenes feel episodic rather than progressive. Each chapter has internal logic, but the through-line—why this scene follows that scene—is missing.',
            'The midpoint functions as a pause rather than a lock. The protagonist gains information but does not make an irreversible choice. This means the second half of Act 2 lacks the escalation structure that genre readers expect.',
            'World-system rules are established but not consistently enforced. Magic costs vary without justification, which undermines the stakes of scenes that rely on magical limitation.'
        ],
        actionSteps: [
            {
                what: 'Map the consequence chain from inciting incident to midpoint',
                why: 'Currently, scenes 14-22 are connected thematically but not causally. This makes them feel optional.',
                success: 'Every scene in Act 2 begins with a consequence from the previous scene and ends with a complication that forces the next.'
            },
            {
                what: 'Rebuild the midpoint as point of no return',
                why: 'The current midpoint delivers information but no commitment. The protagonist can still retreat, which deflates pressure.',
                success: 'After the midpoint, retreat is impossible. The protagonist is locked into the conflict.'
            },
            {
                what: 'Codify magic costs in a single reference document',
                why: 'Inconsistent costs undermine stakes. Readers cannot predict danger if the rules keep changing.',
                success: 'Every magical act in the manuscript follows the same cost structure, visible to careful readers.'
            },
            {
                what: 'Add escalation ladder to protagonist pressure',
                why: 'Currently the protagonist faces similar-level obstacles throughout. Without escalation, tension flatlines.',
                success: 'Each major obstacle is harder than the last. The climax obstacle is the hardest version of the story\'s central problem.'
            },
            {
                what: 'Identify and remove tension relief valves in Act 2',
                why: 'Three scenes in the middle provide rest before pressure has been earned. This trains readers to relax.',
                success: 'Rest scenes are repositioned to follow major victories, not precede them.'
            }
        ],
        deliverables: [
            'Complete 4-Pillar Assessment',
            'Act-by-act structural breakdown',
            'Scene-level annotations and notes',
            'Character arc diagnosis',
            'World-system consistency audit',
            'Revision Priority Sequencing',
            '5+ Action Steps with What/Why/Success',
            'Strategy consultation call',
            '15-25 page comprehensive report'
        ],
        footer: 'This excerpt shows report format and depth. Full Tier 3 reports include act-by-act breakdown, scene-level annotations, character arc assessment, world-system audit, and revision priority sequencing. Reports are 15-25 pages depending on manuscript length and complexity.'
    }
};
