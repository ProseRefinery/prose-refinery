import { ArrowRight, Feather, Layers, BookOpen, Shield, Search, Calendar, AlertTriangle, Activity, PenTool, CheckCircle2 } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { PILLARS } from '@/lib/constants';

// Trust/Proof cards data
const TRUST_CARDS = [
  {
    icon: Layers,
    title: '4 Core Pillars',
    text: 'A systematic framework focusing on structural narrative integrity'
  },
  {
    icon: BookOpen,
    title: 'Battle-Tested',
    text: 'Applied rigorously to every manuscript we edit'
  },
  {
    icon: Search,
    title: 'Genre Specialists',
    text: 'Built specifically for the unique demands of speculative fiction'
  },
  {
    icon: Shield,
    title: 'Actionability Standard',
    text: 'Clear, actionable feedback or we revise it for free.'
  }
];

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Prose Refinery',
    url: 'https://prose-refinery.com',
    description: 'Expert developmental editing for fantasy and sci-fi novels.',
    priceRange: '£95-£5000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UK'
    },
    sameAs: [
      'https://twitter.com/proserefinery'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section - Benefit-focused copy */}
      <Section className="relative flex justify-center pt-20 pb-24" noBorder>
        <GridGlowBackground>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Reveal>
                <HeroBadge icon="award">Prose Refinery | Precision Editorial for Speculative Fiction</HeroBadge>
              </Reveal>

              <ClipReveal delay={100}>
                <Heading as="h1" variant="hero" className="mb-6">
                  Structural Diagnosis & Editorial Standards for{' '}
                  <span className="animated-gradient-text">Speculative Fiction</span>
                </Heading>
              </ClipReveal>

              <ClipReveal delay={200}>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-8 font-[family-name:var(--font-playfair)]">
                  We find the structural cracks that weaken your story.
                  <span className="block text-slate-400 mt-2">Then we provide the architectural blueprint to fix them.</span>
                </h2>
              </ClipReveal>

              <Reveal delay={400}>
                <div className="flex flex-col items-center">
                  <MagneticButton href="/diagnostic" variant="primary" className="px-8 py-4 text-lg">
                    Begin Free Diagnostic
                    <ArrowRight size={20} />
                  </MagneticButton>

                  <a
                    href="/about"
                    className="mt-6 text-sm text-slate-400 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-emerald-400/50 pb-0.5"
                  >
                    Explore The Standards
                  </a>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <p className="text-sm text-slate-500 mt-6">
                  <Feather size={14} className="inline mr-2" />
                  8 questions. 2 minutes. Personalized recommendation.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <p className="text-xs text-emerald-500/70 mt-3">
                  <Calendar size={12} className="inline mr-2" />
                  Currently accepting projects
                </p>
              </Reveal>
            </div>
          </div>
        </GridGlowBackground>
      </Section>


      {/* Why Most Manuscripts Stall (The Problem) */}
      <Section className="bg-red-900/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClipReveal>
              <Heading variant="section" className="mb-4">
                Why Most Manuscripts Stall
              </Heading>
            </ClipReveal>
            <Reveal delay={100}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Talent isn&apos;t the problem. Structure is. Even great writers get stuck in these three traps.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <TiltCard className="h-full">
                <div className="p-8 bg-slate-900/50 rounded-md border border-red-500/10 h-full">
                  <AlertTriangle className="w-10 h-10 text-red-400 mb-6" />
                  <Heading as="h3" variant="card" className="mb-3">The Midpoint Sag</Heading>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    You have a killer opening and an epic ending, but Act II is a wandering mess of subplots that kill narrative momentum.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={100}>
              <TiltCard className="h-full">
                <div className="p-8 bg-slate-900/50 rounded-md border border-red-500/10 h-full">
                  <Activity className="w-10 h-10 text-red-400 mb-6" />
                  <Heading as="h3" variant="card" className="mb-3">The Passive Protagonist</Heading>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Things happen <em>to</em> your character rather than <em>because</em> of them. Agents stop reading when the hero stops driving the plot.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={200}>
              <TiltCard className="h-full">
                <div className="p-8 bg-slate-900/50 rounded-md border border-red-500/10 h-full">
                  <Layers className="w-10 h-10 text-red-400 mb-6" />
                  <Heading as="h3" variant="card" className="mb-3">Worldbuilder&apos;s Disease</Heading>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your magic system is intricate, but it suffocates the story. Info-dumps masquerade as exposition.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* How It Works (The Process) */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClipReveal>
              <Heading variant="section" className="mb-4">
                The Refinery Process
              </Heading>
            </ClipReveal>
            <Reveal delay={100}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We don&apos;t guess. We engineer.
              </p>
            </Reveal>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Reveal delay={0}>
                <div className="relative text-center bg-slate-950 md:bg-transparent p-6 rounded-lg md:p-0 z-10">
                  <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] relative group">
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg z-20">01</div>
                    <Search className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Heading as="h3" variant="card" className="mb-2">Diagnose</Heading>
                  <p className="text-slate-400 text-sm px-4">
                    We use our 4-point framework to identify exactly where your structure is failing.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="relative text-center bg-slate-950 md:bg-transparent p-6 rounded-lg md:p-0 z-10">
                  <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] relative group">
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg z-20">02</div>
                    <PenTool className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Heading as="h3" variant="card" className="mb-2">Reconstruct</Heading>
                  <p className="text-slate-400 text-sm px-4">
                    We provide a specific architectural blueprint to fix the load-bearing walls of your story.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="relative text-center bg-slate-950 md:bg-transparent p-6 rounded-lg md:p-0 z-10">
                  <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] relative group">
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg z-20">03</div>
                    <Feather className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Heading as="h3" variant="card" className="mb-2">Refine</Heading>
                  <p className="text-slate-400 text-sm px-4">
                    Only then do we polish the prose. Clarity follows structure, not the other way around.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>





      {/* Pillars Preview */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClipReveal>
              <Heading variant="section" className="mb-4">
                The 4 Core Pillars of Narrative Integrity
              </Heading>
            </ClipReveal>
            <Reveal delay={100}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Other editors check grammar. We check story architecture—the invisible foundation
                that determines whether your book works.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <TiltCard className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 h-full">
                    <Icon className="w-10 h-10 text-emerald-400 mb-4" />
                    <Heading as="h3" variant="subsection" className="mb-2 text-lg">{pillar.name}</Heading>
                    <p className="text-sm text-slate-400">{pillar.short}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={500}>
            <div className="text-center mt-12">
              <MagneticButton href="/about" variant="secondary">
                Explore The Framework
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Before/After Showcase */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClipReveal>
              <Heading variant="section" className="mb-4">
                Architecture vs. Texture
              </Heading>
            </ClipReveal>
            <Reveal delay={100}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We don&apos;t just talk about structural editing. Here&apos;s a transformation
                from our Tier 4 partnership flagship, <em>Children of Aiyé</em>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal>
              <TiltCard className="h-full">
                <div className="p-6 bg-slate-800/30 rounded-md border border-red-500/30 h-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium mb-4">
                    Before
                  </span>
                  <p className="text-slate-400 italic text-sm leading-relaxed">
                    &quot;Kọlá felt the weight of centuries as she walked. The shrine had always
                    been sacred, though few remembered why. Her grandmother&apos;s voice echoed
                    in her mind, warning of things best left undisturbed.&quot;
                  </p>
                  <p className="text-red-400/60 text-xs mt-4">
                    → Passive, abstract, no stakes
                  </p>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={200}>
              <BeamCard glowColor="emerald" className="h-full">
                <div className="p-6 bg-slate-800/30 rounded-md h-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                    After
                  </span>
                  <p className="text-slate-300 italic text-sm leading-relaxed">
                    &quot;Blood on the shrine meant someone would die within a fortnight. Kọlá
                    pressed her thumb against the iron blade until crimson beaded at the tip.
                    Three drops. Grandmother said three was binding.&quot;
                  </p>
                  <p className="text-emerald-400/60 text-xs mt-4">
                    → Active voice, specific stakes, immediate tension
                  </p>
                </div>
              </BeamCard>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <p className="text-center text-slate-500 text-sm mt-8">
              This is what we do. This is what structural editing looks like.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Services Soft Sell */}
      <Section background="subtle">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ClipReveal>
              <Heading variant="section" className="mb-4">
                Choose Your Level of Support
              </Heading>
            </ClipReveal>
            <Reveal delay={100}>
              <p className="text-slate-400">
                From quick checks to deep partnership.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0} className="h-full">
              <TiltCard className="h-full">
                <div className="bg-slate-800/20 border border-slate-700/50 p-6 rounded-lg hover:border-emerald-500/30 transition-colors h-full flex flex-col">
                  <div className="text-emerald-400 font-bold mb-2">Step 1</div>
                  <Heading as="h3" variant="card" className="mb-2">Diagnostics</Heading>
                  <p className="text-slate-400 text-sm mb-4 flex-grow">Quick checks on Hook, Voice, or Pacing.</p>
                  <div className="text-white font-bold text-lg">£95 – £175</div>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <BeamCard glowColor="emerald" className="h-full">
                <div className="bg-slate-800/40 p-6 rounded-lg h-full flex flex-col">
                  <div className="text-emerald-400 font-bold mb-2">Step 2</div>
                  <Heading as="h3" variant="card" className="mb-2">Focused Audits</Heading>
                  <p className="text-slate-400 text-sm mb-4 flex-grow">Deep dive into one structural pillar.</p>
                  <div className="text-white font-bold text-lg">£350</div>
                </div>
              </BeamCard>
            </Reveal>
            <Reveal delay={200} className="h-full">
              <TiltCard className="h-full">
                <div className="bg-slate-800/20 border border-slate-700/50 p-6 rounded-lg hover:border-emerald-500/30 transition-colors h-full flex flex-col">
                  <div className="text-emerald-400 font-bold mb-2">Step 3</div>
                  <Heading as="h3" variant="card" className="mb-2">Full Manuscript</Heading>
                  <p className="text-slate-400 text-sm mb-4 flex-grow">Complete 4-pillar overhaul.</p>
                  <div className="text-white font-bold text-lg">£1,500+</div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="text-center mt-12">
              <MagneticButton href="/services" variant="secondary">
                View Full Pricing
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ClipReveal>
            <Heading variant="section" className="mb-6">
              Stop Guessing. Start Engineering.
            </Heading>
          </ClipReveal>
          <Reveal delay={100}>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Take our 2-minute diagnostic to discover exactly which structural load-bearing wall
              needs attention first.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <MagneticButton href="/diagnostic" variant="primary">
                Start Your Diagnostic
                <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
