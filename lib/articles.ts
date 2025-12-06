import { Layers, Zap, Target, BookOpen } from 'lucide-react';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  image: string; // We'll use gradients/icons for now if no real images
  content: string; // Markdown-like or HTML string
}

export const ARTICLES: Article[] = [
  {
    slug: 'why-agents-reject-fantasy',
    title: 'The 3 Structural Reasons Agents Reject Fantasy Novels',
    excerpt: 'It’s rarely the prose. It’s usually the foundation. Here is what 200+ query rejections taught us about narrative integrity.',
    category: 'Industry Insights',
    readTime: '5 min read',
    publishDate: 'Dec 05, 2024',
    image: 'purple',
    content: `
      <p>You've polished your opening chapter until it gleams. The prose is tight. The hook lands. An agent requests your full manuscript.</p>
      <p>Then silence. Then rejection.</p>
      <p>Here's what most writers assume: my writing wasn't good enough. So they go back to that first chapter and polish some more. Different adjectives. Sharper metaphors. Another round of line edits.</p>
      <p>This is almost always the wrong diagnosis.</p>
      <p>When agents reject full manuscripts, the problem is rarely the prose. It's the architecture. And architecture problems are invisible if you're only looking at sentences.</p>

      <h3>1. The "Soggy Middle" Syndrome</h3>
      <p>Your first act crackles. Your climax delivers. But somewhere between pages 100 and 250, your story starts to float. Characters have conversations. They travel. They prepare. They wait.</p>
      <p>This happens when your antagonist stops applying pressure.</p>
      <p>Think of your middle act as a vice, not a bridge. The protagonist should be increasingly trapped, increasingly desperate, increasingly forced into choices they don't want to make. If your middle feels like a lull before the storm, you've let your antagonist take a coffee break.</p>
      <p><strong>Fix:</strong> Map your antagonist's actions scene by scene through Act 2. If they're not actively tightening the screws every 20-30 pages, your structure has a hole.</p>

      <h3>2. World-Building Without Consequence</h3>
      <p>Fantasy writers love magic systems. The danger is building one that can solve any problem. If magic can solve any problem, you have no tension.</p>
      <p>This is why agents look for what Brandon Sanderson calls "hard magic": systems with clear costs, firm limitations, and rules that constrain your hero rather than rescue them. The reader needs to understand what magic can't do, or they'll never believe your protagonist is truly cornered.</p>
      <p>Soft magic has its place (Gandalf's power is deliberately vague), but it works best for mystery and wonder, not for solving plot problems. The moment your wizard can simply magic their way out of a crisis, your stakes evaporate.</p>
      <p><strong>Fix:</strong> List every time magic solves a problem in your manuscript. Now ask: what did it cost? If the answer is "nothing much," you've found a structural weakness.</p>

      <h3>3. The Passive Protagonist</h3>
      <p>This is the most common reason fantasy novels fail at the structural level, and the hardest for writers to see in their own work.</p>
      <p>Ask yourself: do things happen to your hero, or because of your hero?</p>
      <p>If your protagonist is swept along by events—rescued by allies, pushed by circumstances, reacting to the antagonist's moves—you don't have a protagonist. You have a passenger.</p>
      <p>Agents want heroes who cause their story. That means choices with consequences. Mistakes that create new problems. Decisions that close off other paths. A protagonist who could be replaced by a moderately lucky bystander isn't driving the narrative.</p>
      <p><strong>Fix:</strong> Examine your five major plot turning points. At each one, ask: did my hero make an active choice that caused this? If the answer is "they were in the right place at the right time," restructure.</p>

      <h3>The Hard Truth</h3>
      <p>Prose can be fixed in revision. A good developmental editor can sharpen your sentences in a few passes.</p>
      <p>Structure requires rebuilding from the foundations.</p>
      <p>Agents know this. That's why a beautifully written manuscript with structural rot gets rejected faster than a rough-but-sound one. They're not looking for perfect pages—they're looking for stories that work.</p>
      
      <hr />
      
      <p><em>Not sure if your manuscript has structural issues? Our <strong>Tier 1 Diagnostic</strong> identifies architectural problems in 48 hours, before they cost you a request.</em></p>
    `
  },
  {
    slug: 'pacing-the-middle-act',
    title: 'How to Fix a Sagging Middle Act',
    excerpt: 'Pages 100-250 are where novels go to die. Learn the "Midpoint Reversal" technique to keep readers turning pages.',
    category: 'Craft Technique',
    readTime: '7 min read',
    publishDate: 'Dec 02, 2024',
    image: 'emerald',
    content: `
      <h2>Act 2 is where novels go to die.</h2>
      <p>Not because writers lack ideas. Usually they have too many. The problem is that Act 2 is a desert: 50% of your word count, stretching between the excitement of your setup and the momentum of your climax. It's where you must deliver on everything your opening promised, and it's where most manuscripts start to wander.</p>
      <p>If your beta readers say things like "it picked up again around chapter 20" or "I got a bit lost in the middle," you have a structural problem. Here's how to diagnose it and how to fix it.</p>

      <h3>The Midpoint Reversal</h3>
      <p>The single most important fix for a sagging middle is also the most precise: something must happen at your 50% mark that fundamentally shifts your protagonist's posture.</p>
      <p>Before the midpoint, your hero is reactive. They're running, hiding, surviving, gathering information. The antagonist is driving the action; your protagonist is responding to it.</p>
      <p>After the midpoint, your hero becomes active. They stop fleeing and start fighting. They commit to a course of action. They take the war to the enemy's door.</p>
      <p>This isn't a vague tonal shift. It's a specific scene. In <em>The Empire Strikes Back</em>, the midpoint is Luke leaving Dagobah to rescue his friends. He's no longer training and hiding; he's chosen to confront Vader. In <em>The Hunger Games</em>, it's Katniss destroying the Career alliance's supplies. She stops surviving the arena and starts winning it.</p>
      <p><strong>Fix:</strong> Find your manuscript's exact midpoint (total word count ÷ 2). What happens there? If it's a conversation, a travel scene, or a quiet character moment, you've likely missed your reversal. Move or create a scene where your protagonist makes an irreversible choice to go on the offensive.</p>

      <h3>Escalating Stakes</h3>
      <p>If your stakes are "death" in chapter one, they cannot still be "death" in chapter fifteen. The reader has already absorbed that threat. It's priced in.</p>
      <p>Stakes must escalate, not by making the same threat louder, but by expanding what can be lost.</p>
      <p>The progression typically looks like this: personal survival → survival of loved ones → survival of community → survival of an ideal or way of life. Each expansion raises the price of failure and gives your protagonist more to carry.</p>
      <p>But escalation isn't just about adding more people to the body count. Stakes can deepen as well as widen. "I might die" becomes "I might die having failed everyone who believed in me" becomes "I might die and prove my father was right about me all along." Internal stakes often hit harder than external ones.</p>
      <p><strong>Fix:</strong> List your major Act 2 scenes. Next to each, write what's at stake in that scene specifically. If you see the same answer repeated, you've found your plateau. Raise the price, either by threatening something new or by making your protagonist realise what losing would truly mean.</p>

      <h3>The Antagonist's Pressure</h3>
      <p>Here's the secret most craft books won't tell you: a sagging middle is almost always an antagonist problem.</p>
      <p>If your middle feels slack, it's because your antagonist has stopped acting. They're waiting in their tower for the hero to arrive. They've delegated to minions. They've become a destination rather than a force.</p>
      <p>Your antagonist should be winning through most of Act 2. They should be closing escape routes, turning allies, discovering the hero's weaknesses, and exploiting them. Every time your protagonist takes a step forward, the antagonist should take two.</p>
      <p><strong>Fix:</strong> Write a parallel timeline of your antagonist's actions through Act 2. Not their minions—them. If you can't fill it, your antagonist has gone passive, and your middle will sag no matter how hard your protagonist works.</p>

      <h3>The Promise of the Premise</h3>
      <p>Finally, remember what Act 2 is for. This is where you deliver on the story you sold in your opening.</p>
      <p>If your premise is "a thief must break into an unbreakable vault," Act 2 is the heist: the planning, the setbacks, the improvisations. If your premise is "a young wizard discovers they're the heir to a forbidden magic," Act 2 is where they learn that magic, test its limits, and discover its costs.</p>
      <p>Readers who loved your opening are waiting for you to explore the world and conflict you've set up. A sagging middle often means you've delayed that exploration in favour of subplots, backstory, or setup for Act 3.</p>
      <p><strong>Fix:</strong> Write your premise in one sentence. Now audit your Act 2 scenes: what percentage of them directly deliver on that premise? If less than 70%, you've drifted. Cut or compress the scenes that don't serve it.</p>

      <h3>The Structural Truth</h3>
      <p>A tight middle isn't about more action or faster pacing. It's about compression: making sure every scene advances the protagonist toward the midpoint reversal, raises the stakes, or shows the antagonist tightening their grip.</p>
      <p>If your middle sags, you don't need to write more. You need to cut what's not earning its place and sharpen what remains.</p>

      <hr />

      <p><em>Struggling to locate the structural gaps in your manuscript? Our <strong>Tier 1 Diagnostic</strong> maps your architecture in 48 hours, pinpointing exactly where the tension drops and how to rebuild it.</em></p>
    `
  },
  {
    slug: 'world-building-vs-info-dumping',
    title: 'World-Building vs. Info-Dumping: The Golden Ratio',
    excerpt: 'Your readers want to know about your magic system, but they don’t want a history textbook. Here is how to weave lore into action.',
    category: 'World Building',
    readTime: '4 min read',
    publishDate: 'Nov 28, 2024',
    image: 'blue',
    content: `
      <p>Every fantasy writer faces the same temptation. You've spent months (years, decades) crafting a world with its own religions, trade routes, blood feuds, and calendar systems. You want readers to see it all.</p>
      <p>So you do what feels natural: you explain.</p>
      <p>And that's where manuscripts go to die.</p>

      <h3>The Iceberg Principle</h3>
      <p>Hemingway argued that the dignity of a story's movement comes from what the writer knows but leaves unsaid—the seven-eighths of the iceberg hidden beneath the water. Fantasy world-building works the same way.</p>
      <p>You need to know 100% of your world's history. Your reader needs roughly 10%—the fraction that affects what's happening right now, on this page, to these characters.</p>
      <p>The rest? It's not wasted. It's ballast. It's what makes your world feel real rather than invented on the fly. Readers sense the weight of what you're not telling them. That weight creates gravity.</p>

      <h3>The Tea Cup Rule</h3>
      <p>Here's a practical test: never explain the history of the tea trade when two characters are simply having tea.</p>
      <p>Only explain the tea trade if the tea is poisoned because of a trade war—and even then, feed it through the scene's tension rather than halting everything for a lecture.</p>
      <p>Ursula K. Le Guin did this masterfully. In <em>The Left Hand of Darkness</em>, we learn about Gethenian biology not through textbook explanations but through Genly Ai's confusion, his mistakes, his slow adjustment. The world reveals itself through friction.</p>

      <h3>The Golden Ratio in Practice</h3>
      <p>So what's the actual ratio? It shifts by scene, but a useful heuristic: for every piece of world-building you include, ask yourself three questions:</p>
      <ul>
        <li>Does my protagonist need to know this now to act?</li>
        <li>Will withholding this create productive confusion or just frustration?</li>
        <li>Can I show this through action, dialogue, or sensory detail instead of exposition?</li>
      </ul>
      <p>If you answer "no" to the first two and "yes" to the third, you've found your move.</p>

      <h3>The Real Secret</h3>
      <p>Info-dumping isn't really about information. It's about trust—or lack of it. Writers info-dump because they don't trust readers to follow along, and they don't trust their own world to reveal itself organically.</p>
      <p>Build the iceberg. Then let your readers discover it one cold, gleaming edge at a time.</p>
    `
  }
];
