// Before/after snippet library for structural proof of competence
// Each snippet shows a structural change, not a prose polish

export interface Snippet {
    id: string;
    pillar: 'Plot Architecture' | 'Character Integrity' | 'World-System Logic' | 'Pacing & Pressure';
    title: string;
    before: string;
    after: string;
    changes: string[];
    unchanged: string;
}

export const SNIPPETS: Record<string, Snippet> = {
    // Plot Architecture snippets
    'plot-architecture-1': {
        id: 'plot-architecture-1',
        pillar: 'Plot Architecture',
        title: 'Adding consequence to scene endings',
        before: `The council meeting ended. Kira walked out into the corridor, her mind racing. She needed to think about what Lord Varen had said. Maybe she could talk to her mentor about it tomorrow.`,
        after: `The council meeting ended with Lord Varen's ultimatum still hanging in the air. Kira had three days. Three days to find the traitor, or she would take their place on the gallows. She didn't have time to think. She had to move.`,
        changes: [
            'Added concrete deadline (3 days) creating structural pressure',
            'Converted passive reflection into active stakes',
            'Scene now ends with changed situation, not summary'
        ],
        unchanged: 'Prose style and sentence structure unchanged. No "beautification."'
    },
    'plot-architecture-2': {
        id: 'plot-architecture-2',
        pillar: 'Plot Architecture',
        title: 'Clarifying the story promise',
        before: `Chapter One: The Beginning. It was a dark time in the kingdom. Many things had happened before this story starts, and they would shape everything that came after.`,
        after: `Chapter One: The Last Honest Thief. Mira had stolen many things in her life, but never a corpse. Tonight would be different—because the corpse was her father's, and the people who killed him wanted it back.`,
        changes: [
            'Story promise now visible in first paragraph',
            'Protagonist goal established immediately',
            'Stakes and opposition introduced together'
        ],
        unchanged: 'No line-level prose polishing. Only structural repositioning.'
    },

    // Character Integrity snippets
    'character-integrity-1': {
        id: 'character-integrity-1',
        pillar: 'Character Integrity',
        title: 'Making internal conflict external',
        before: `Jace felt conflicted. Part of him wanted to help his sister, but another part felt angry at her betrayal. He wasn't sure what to do. His emotions were complicated.`,
        after: `Jace held the key to his sister's cell. One turn, and she walked free—straight to the enemies she had chosen over him. He could hear her breathing on the other side of the door. Waiting. Trusting him to save her. Again.`,
        changes: [
            'Internal state converted to external action (holding the key)',
            'Conflict made visible through physical choice',
            'Reader can now see the stakes without being told'
        ],
        unchanged: 'Emotional content preserved. Prose not "elevated."'
    },
    'character-integrity-2': {
        id: 'character-integrity-2',
        pillar: 'Character Integrity',
        title: 'Giving the protagonist a specific want',
        before: `Elena wanted things to be better. She hoped something would change. Life in the village had always been hard, and she dreamed of more.`,
        after: `Elena needed to reach the capital before the last ship sailed on Saint's Day. Miss that ship, and her brother dies in the northern mines. She had nineteen days and three hundred miles of hostile territory between her and the harbor.`,
        changes: [
            'Vague "wanting" replaced with specific, timed goal',
            'External obstacle now visible (distance, time)',
            'Stakes attached to failure (brother dies)'
        ],
        unchanged: 'Sentence-level prose unchanged. Only goal structure clarified.'
    },

    // World-System Logic snippets
    'world-system-logic-1': {
        id: 'world-system-logic-1',
        pillar: 'World-System Logic',
        title: 'Making magic cost something',
        before: `Sera raised her hand and cast a fireball at the enemy soldiers. It exploded among them, scattering their formation. She cast another, then another, until they retreated.`,
        after: `Sera raised her hand. The fireball cost her a year of her life—one less summer, one less autumn. She threw it anyway. The soldiers scattered. She felt the cold settle into her joints, decades arriving early. She had maybe three more in her before the coughing started.`,
        changes: [
            'Magic now has visible, personal cost',
            'Choice creates tension (is it worth aging?)',
            'Reader can track remaining "resources"'
        ],
        unchanged: 'Combat action unchanged. Only cost system added.'
    },
    'world-system-logic-2': {
        id: 'world-system-logic-2',
        pillar: 'World-System Logic',
        title: 'Making rules constrain choices',
        before: `The guild had many rules, but Tam ignored most of them. He did what he wanted and nobody stopped him. The other thieves respected his independence.`,
        after: `The guild's first rule was simple: steal alone, die alone. Tam had broken it twice. The first time cost him two fingers. The second time, they took his apprentice. There would not be a third warning.`,
        changes: [
            'Rules now have visible enforcement',
            'Past consequences established (fingers, apprentice)',
            'Future constraint clear (one more strike = death)'
        ],
        unchanged: 'Character voice unchanged. Only consequence structure added.'
    },

    // Pacing & Pressure snippets
    'pacing-pressure-1': {
        id: 'pacing-pressure-1',
        pillar: 'Pacing & Pressure',
        title: 'Converting summary into scene turn',
        before: `After the battle, the soldiers rested. Days passed. They recovered from their wounds and prepared for the next fight. Eventually, word came that the enemy was moving again.`,
        after: `Kel had just closed his eyes when the runner arrived. "They're coming. Two hours, maybe less." His wounds hadn't closed. His sword arm still wouldn't grip. In two hours, he would fight again, or he would die. He forced himself to stand.`,
        changes: [
            'Summary replaced with immediate pressure',
            'Rest denied (two hours, not days)',
            "Physical limitation creates tension (arm won't grip) "
        ],
        unchanged: 'Setting unchanged. Prose style unchanged. Only pacing compressed.'
    },
    'pacing-pressure-2': {
        id: 'pacing-pressure-2',
        pillar: 'Pacing & Pressure',
        title: 'Removing the false breather',
        before: `They escaped the palace and found a safe house. "We made it," Yara said, smiling for the first time in days. They shared a meal, laughed about old times, and finally felt hopeful. Tomorrow, they would plan.`,
        after: `They escaped the palace and found the safe house. Yara reached for the door—and saw the imperial seal, fresh and wet, stamped across the frame. The hunters had been here first. "Back," she whispered. "Back. Now."`,
        changes: [
            'False safety removed (safe house compromised)',
            'Relief denied before earned',
            'Tension escalates rather than pausing'
        ],
        unchanged: 'Escape sequence unchanged. Only the "relief valve" removed.'
    }
};

// Helper to get snippet by pillar
export function getSnippetsByPillar(pillar: Snippet['pillar']): Snippet[] {
    return Object.values(SNIPPETS).filter(s => s.pillar === pillar);
}

// Helper to get random snippet (for rotation)
export function getRandomSnippet(): Snippet {
    const keys = Object.keys(SNIPPETS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return SNIPPETS[randomKey];
}
