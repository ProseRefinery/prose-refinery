// Complaint-specific landing page data
// Each complaint page mirrors a specific writer pain and routes to the diagnostic quiz

export interface SymptomMapping {
    symptom: string;
    signal: string;
    whatToCheck: string;
}

export interface ComplaintPage {
    slug: string;
    headline: string;
    subhead: string;
    symptomMappings: SymptomMapping[];
    defaultNudgeTier: 1 | 2 | 3;
    proofSnippetId: string;
    microFaq: { question: string; answer: string }[];
}

export const COMPLAINT_PAGES: Record<string, ComplaintPage> = {
    'form-rejections': {
        slug: 'form-rejections',
        headline: "Still getting form rejections? Start with structure.",
        subhead: "Most passes happen when the opening does not create narrative pressure or a clear promise. This quiz identifies your likely failure zone and the fastest fix.",
        defaultNudgeTier: 2,
        proofSnippetId: 'plot-architecture-1',
        symptomMappings: [
            {
                symptom: "I keep getting 'not for us' with no detail.",
                signal: "Opening promise not legible or genre signals conflicted.",
                whatToCheck: "By page 1-2, can a reader state what the story is about and why it matters?"
            },
            {
                symptom: "They say they couldn't connect with my character.",
                signal: "Character pressure is low, or the protagonist's need is not in motion.",
                whatToCheck: "Does your protagonist want something specific by the end of chapter one?"
            },
            {
                symptom: "Full requests lead to silence.",
                signal: "The opening sells, but the middle loses them. Structural fatigue.",
                whatToCheck: "Does your midpoint raise stakes, or does it summarize?"
            },
            {
                symptom: "Agents say the pacing is 'off' but give no specifics.",
                signal: "Scene turns are missing. Tension resets instead of building.",
                whatToCheck: "Does each scene end with a changed situation, not a pause?"
            },
            {
                symptom: "Feedback says the worldbuilding is 'too much.'",
                signal: "Exposition is not earned through conflict. Reader patience exhausted.",
                whatToCheck: "Is every world detail delivered through a character who needs it right now?"
            },
            {
                symptom: "I've revised this manuscript five times and nothing improves.",
                signal: "You are polishing prose, not fixing structure. The foundation has cracks.",
                whatToCheck: "Have you ever mapped your manuscript's scene-level consequence chain?"
            }
        ],
        microFaq: [
            { question: "Do I need to upload my manuscript?", answer: "No. The quiz asks 8 questions about your manuscript. We do not request files until we confirm fit." },
            { question: "Will this guarantee agent interest?", answer: "No promises. We diagnose structural integrity. Agents respond to stories that hold together under pressure." },
            { question: "What happens after I get results?", answer: "You receive a tier recommendation and clear next step. No pressure, no upsell traps." }
        ]
    },
    'sagging-middle': {
        slug: 'sagging-middle',
        headline: "If your middle sags, it is almost never your prose.",
        subhead: "A sagging middle usually means pressure is leaking: escalation stalls, goals stop turning, or conflict becomes repetitive. This quiz identifies where it breaks.",
        defaultNudgeTier: 2,
        proofSnippetId: 'pacing-pressure-1',
        symptomMappings: [
            {
                symptom: "My middle feels like it's just scenes, not story.",
                signal: "Scene turns are missing, so pressure resets after each chapter.",
                whatToCheck: "Does each scene end with a changed situation, not a summary?"
            },
            {
                symptom: "Stakes exist but don't escalate.",
                signal: "You have a threat, but no escalation ladder. Each complication feels equal.",
                whatToCheck: "Is each setback worse than the last? Does failure cost more each time?"
            },
            {
                symptom: "My protagonist wanders aimlessly in Act 2.",
                signal: "Goal is too vague or reactive. Protagonist is not driving action.",
                whatToCheck: "Can you state what your protagonist is trying to achieve in every chapter?"
            },
            {
                symptom: "Subplots feel disconnected from the main thread.",
                signal: "Subplots are not pressuring the main arc. They exist in parallel, not intersection.",
                whatToCheck: "Does each subplot complicate or clarify the protagonist's central choice?"
            },
            {
                symptom: "Readers say 'I got bored in the middle.'",
                signal: "Tension valve opens too often. Scenes provide relief before earning it.",
                whatToCheck: "Are you giving breathers before the reader needs one?"
            },
            {
                symptom: "I know the ending but can't get there.",
                signal: "Your midpoint is not doing its job. It should lock the protagonist in, not pause the story.",
                whatToCheck: "Does your midpoint eliminate retreat? Does it raise stakes permanently?"
            }
        ],
        microFaq: [
            { question: "Do I need to upload my manuscript?", answer: "No. The quiz asks 8 questions about your manuscript. We do not request files until we confirm fit." },
            { question: "Is this about prose style or structure?", answer: "Structure only. Sagging middles are rarely a prose problem. They are an architecture problem." },
            { question: "What happens after I get results?", answer: "You receive a structural priority map and tier recommendation. One clear next step." }
        ]
    }
};
