'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { TiltCard } from '@/components/effects/TiltCard';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import LeadModal from '@/components/aiye/LeadModal';
import { FAQ, StickyCTA, GlowTiltCard } from '@/components/aiye';

// ============================================================================
// CHILDREN OF AIYE LANDING PAGE
// Sections 1-6 (First Half)
// ============================================================================

export default function ChildrenOfAiyePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEmailSubmit = useCallback((email: string) => {
    // Redirect to chapter 1 after email capture
    window.location.href = '/children-of-aiye/chapter-1';
  }, []);

  return (
    <>
      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleEmailSubmit}
      />

      <div className="bg-[#0a0a0a] min-h-screen">
        {/* ================================================================
            SECTION 1: HERO (100vh)
            ================================================================ */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#111111] pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Mobile: Cover first, Desktop: Text first */}

              {/* Book Cover - Mobile: First, Desktop: Second */}
              <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center">
                <Reveal delay={200}>
                  <GlowTiltCard className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-[#D4AF37]/20">
                      <Image
                        src="/children-of-aiye/cover.jpg"
                        alt="Children of Aiye book cover"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 640px) 300px, (max-width: 1024px) 350px, 400px"
                      />
                    </div>
                  </GlowTiltCard>
                </Reveal>
              </div>

              {/* Text Content - Mobile: Second, Desktop: First */}
              <div className="order-2 lg:order-1 w-full lg:w-1/2 text-center lg:text-left">
                {/* Eyebrow */}
                <Reveal delay={0}>
                  <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4 sm:mb-6">
                    A Prose Refinery Press Publication
                  </p>
                </Reveal>

                {/* Headline */}
                <ClipReveal delay={100}>
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f0f0] leading-tight mb-4 sm:mb-6"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    When the gods return, Lagos becomes the battlefield.
                  </h1>
                </ClipReveal>

                {/* Subheadline */}
                <Reveal delay={300}>
                  <p
                    className="text-base sm:text-lg text-[#a0a0a0] mb-6 sm:mb-8"
                    style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                  >
                    A YA Africanfuturist fantasy &bull; 20 chapters &bull; 21 illustrations
                  </p>
                </Reveal>

                {/* CTAs */}
                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <MagneticButton
                      variant="gold-outline"
                      onClick={handleOpenModal}
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base"
                    >
                      Read Chapter 1 Free
                    </MagneticButton>
                    <MagneticButton
                      variant="gold"
                      href="/children-of-aiye/checkout"
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base"
                    >
                      Enter Aiyé — £12.99
                    </MagneticButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
            <svg
              className="w-6 h-6 text-[#a0a0a0]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* ================================================================
            SECTION 2: POSITIONING
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Reveal delay={0}>
              <blockquote
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#f0f0f0] leading-relaxed mb-6"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                &ldquo;What Percy Jackson did for Greek mythology, Children of Aiy&eacute; does for Yoruba cosmology.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg text-[#D4AF37] uppercase tracking-widest font-semibold">
                Not asking for inclusion. Building it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 3: TASTE TEST
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                Open the Book
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Open the Book
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <GlowTiltCard className="mb-8" maxTilt={5}>
                <div className="bg-[#111111] rounded-xl p-6 sm:p-8 lg:p-10">
                  <p
                    className="text-base sm:text-lg md:text-xl text-[#a0a0a0] leading-relaxed italic"
                    style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                  >
                    &ldquo;The city breathes smoke and prayer. Lagos in 2067 is a solar-punk sprawl of floating markets,
                    holographic billboards praising the Orishas, and streets that remember everyone who walks them.
                    The megacity never sleeps&mdash;neither do the things hunting through it.&rdquo;
                  </p>
                </div>
              </GlowTiltCard>
            </Reveal>

            <Reveal delay={400}>
              <MagneticButton
                variant="gold-outline"
                onClick={handleOpenModal}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base"
              >
                Keep Reading — Free
              </MagneticButton>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 4: THE PILLARS (THE WORLD)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The World
                </p>
              </Reveal>
              <ClipReveal delay={100}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  The World
                </h2>
              </ClipReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Future Lagos */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      Future Lagos
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      2067. Solar-punk megacity where ancestral shrines rise beside
                      holographic skyscrapers. The old gods never left—they just
                      learned to speak through new technology.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 2: African Cosmologies */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      African Cosmologies
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      Yoruba Orishas. Igbo Alusi. Edo spirits. The divine forces
                      of West African tradition clash and collaborate in a war
                      that&rsquo;s been brewing since before colonization.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 3: The Frame System */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      The Frame System
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      Divine Frames channel Orisha power through human vessels.
                      One person, one Frame. Unless you&rsquo;re the anomaly that
                      breaks every rule the gods ever made.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 5: THE TRIO (THE DISCIPLES)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The Disciples
                </p>
              </Reveal>
              <ClipReveal delay={100}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  The Disciples
                </h2>
              </ClipReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Afolabi */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="text-xs tracking-widest text-[#D4AF37] uppercase">
                        The Anomaly
                      </span>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#f0f0f0] mb-2"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      Afolabi
                    </h3>
                    <p className="text-sm text-[#a0a0a0] mb-4">Age 17</p>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      Carries four Frames when the limit is one. Either the gods
                      made a mistake, or he&rsquo;s exactly what they need to
                      stop what&rsquo;s coming. He&rsquo;s betting on the former.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Kehinde */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="text-xs tracking-widest text-[#D4AF37] uppercase">
                        The Anchor
                      </span>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#f0f0f0] mb-2"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      Kehinde
                    </h3>
                    <p className="text-sm text-[#a0a0a0] mb-4">The Twin</p>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      Reads emotions like others read street signs. In a world of
                      lies and divine manipulation, she&rsquo;s the only one who
                      can tell when the truth walks into the room.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Taiwo */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="text-xs tracking-widest text-[#D4AF37] uppercase">
                        The Builder
                      </span>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#f0f0f0] mb-2"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      Taiwo
                    </h3>
                    <p className="text-sm text-[#a0a0a0] mb-4">The Twin</p>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                    >
                      Controls metal and machines with a thought. While others
                      pray to the Orishas, she builds weapons to kill them—just
                      in case the gods forget which side they&rsquo;re on.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 6: THE THREAT
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(26, 5, 5, 0.85), rgba(42, 10, 10, 0.85)), url(/children-of-aiye/bg-threat-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-red-500 uppercase mb-4">
                The Enemy
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-6 sm:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                The Ajogun Are Waking
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <p
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-8"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                Eight forces of chaos. Eight enemies of human destiny. Death. Disease.
                Loss. Paralysis. Curse. Imprisonment. Affliction. Big Trouble. They were
                sealed away millennia ago, but seals don&rsquo;t last forever. The barriers
                are cracking. Something ancient is remembering how to hate.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p
                className="text-lg sm:text-xl text-red-400 italic"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                And they remember the children of Aiy&eacute; betrayed them.
              </p>
            </Reveal>
          </div>

          {/* CRITICAL: Threat Sentinel for scroll-based interactions */}
          <div id="threat-sentinel" aria-hidden="true" />
        </section>

        {/* ================================================================
            SECTION 7: WHAT YOU GET (THE EXPERIENCE)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The Experience
                </p>
              </Reveal>
              <ClipReveal delay={100}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                >
                  What You Get
                </h2>
              </ClipReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1: Illustrated Edition */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Included
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#f0f0f0] mb-4"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      Illustrated Edition
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      21 original artworks. One for each chapter, plus the invocation.
                      Premium illustrated EPUB that brings the world of Aiy&eacute; to life.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Feature 2: Original Soundtrack */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-slate-800 text-[#a0a0a0] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Coming Spring 2026
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#f0f0f0] mb-4"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      Original Soundtrack
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      Atmospheric score composed for the world of Aiy&eacute;.
                      Free upgrade for all buyers. Timing subject to production.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Feature 3: Typeset PDF */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-slate-800 text-[#a0a0a0] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Coming 2026
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#f0f0f0] mb-4"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      Typeset PDF
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      Print-ready PDF edition with full typography.
                      Free upgrade for all buyers when available.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 8: AUTHOR BIO
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  About the Author
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Author Image Placeholder */}
              <Reveal delay={100}>
                <div className="flex justify-center lg:justify-end">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-[#111111] border border-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                    <span
                      className="text-5xl sm:text-6xl lg:text-7xl text-[#D4AF37]/50 font-bold"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      OB
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Author Bio */}
              <Reveal delay={200}>
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-6"
                    style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                  >
                    Olanrewaju Bello
                  </h3>
                  <div
                    className="space-y-4 text-base sm:text-lg text-[#a0a0a0] leading-relaxed"
                    style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                  >
                    <p>
                      Some stories survive erasure. Others wait to be rebuilt.
                    </p>
                    <p>
                      Twenty years ago, I started asking: What if Yoruba mythology stood where
                      Greek and Norse stand today? What if our gods got the epic treatment
                      that Zeus and Odin take for granted?
                    </p>
                    <p>
                      Children of Aiy&eacute; is my answer.
                    </p>
                    <p>
                      Not a request for inclusion. A restoration of what was always ours to carry.
                    </p>
                  </div>
                  <p
                    className="mt-8 text-lg text-[#D4AF37] italic"
                    style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                  >
                    The Archive remembers.
                  </p>
                  <p className="mt-4 text-sm text-[#a0a0a0]">
                    Founder, Prose Refinery Press &bull; London
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 9: TARGET AUDIENCE
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <ClipReveal delay={0}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                >
                  This Book Is For Readers Who...
                </h2>
              </ClipReveal>
            </div>

            <Reveal delay={200}>
              <div className="space-y-4 sm:space-y-6">
                {[
                  'Loved Percy Jackson but craved stories from YOUR mythology',
                  'Are tired of Africa as "setting" and ready for Africa as "source"',
                  "Want fantasy that doesn't apologise for its gods",
                  'Believe Sango deserves the screen time Zeus got',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <p
                      className="text-base sm:text-lg text-[#f0f0f0]"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={400}>
              <p className="mt-8 text-center text-sm text-[#a0a0a0]">
                15+. Contains battle violence and mature themes.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 10: FAQ
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  Questions
                </p>
              </Reveal>
              <ClipReveal delay={100}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                >
                  Before You Enter Aiy&eacute;
                </h2>
              </ClipReveal>
            </div>

            <Reveal delay={200}>
              <FAQ
                items={[
                  {
                    question: 'Is this the complete book?',
                    answer: 'Yes. Volume 1 contains 20 full chapters, completely edited and publication-ready. This is not a preview or sample—it\'s the entire novel.',
                  },
                  {
                    question: 'What format will I receive?',
                    answer: 'EPUB format, which works on virtually all e-readers and apps: Kindle, Apple Books, Kobo, Google Play Books, and any EPUB reader. Instant download after purchase.',
                  },
                  {
                    question: 'What about the locked features?',
                    answer: 'The original soundtrack and typeset PDF editions will ship as FREE upgrades to everyone who purchases now. You won\'t pay extra—your purchase today includes all future additions.',
                  },
                  {
                    question: 'Is this appropriate for younger readers?',
                    answer: 'Recommended for ages 15+. The story contains battle violence, themes of loss and identity, and mythological intensity. No explicit sexual content or gratuitous gore.',
                  },
                  {
                    question: 'What if I don\'t like it?',
                    answer: '14-day satisfaction guarantee. If the book isn\'t for you, email us for a full refund. No questions, no hassle.',
                  },
                  {
                    question: 'Will there be more books?',
                    answer: 'Children of Aiye is Volume 1 of a planned series. Volume 2 is in development. Newsletter subscribers get first access to announcements.',
                  },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 11: SOCIAL PROOF (TESTIMONIALS)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <ClipReveal delay={0}>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0]"
                  style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                >
                  Early Readers Say
                </h2>
              </ClipReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  quote: 'Finally, a fantasy where I see my gods treated with the same reverence as the Greek pantheon.',
                  attribution: 'Beta Reader',
                },
                {
                  quote: "The magic system is unlike anything I've read. Grounded in real tradition but completely fresh.",
                  attribution: 'Beta Reader',
                },
                {
                  quote: "I couldn't put it down. Afolabi's story grabbed me from the first page.",
                  attribution: 'Beta Reader',
                },
              ].map((testimonial, index) => (
                <Reveal key={index} delay={200 + index * 100}>
                  <GlowTiltCard className="h-full">
                    <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                      <p
                        className="text-base sm:text-lg text-[#f0f0f0] leading-relaxed mb-6 italic"
                        style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                      >
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <p className="text-sm text-[#a0a0a0]">
                        &mdash; {testimonial.attribution}
                      </p>
                    </div>
                  </GlowTiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 12: PRICING CTA
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <Reveal delay={0}>
              <GlowTiltCard className="w-full" maxTilt={5}>
                <div className="bg-[#111111] rounded-xl p-8 sm:p-12 text-center">
                  <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                    Early Access Edition
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-6"
                    style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                  >
                    Enter Aiy&eacute;
                  </h2>
                  <p
                    className="text-5xl sm:text-6xl font-bold text-[#D4AF37] mb-4"
                    style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                  >
                    &pound;12.99
                  </p>
                  <p className="text-sm text-[#a0a0a0] mb-8">
                    Launch Price &mdash; will increase when upgrades unlock
                  </p>
                  <MagneticButton
                    variant="gold"
                    href="/children-of-aiye/checkout"
                    className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-lg text-base sm:text-lg"
                  >
                    Enter Aiyé — Instant Download
                  </MagneticButton>
                  <p className="mt-6 text-xs text-[#a0a0a0] uppercase tracking-wider">
                    EPUB format &bull; Works everywhere &bull; 14-day guarantee
                  </p>
                </div>
              </GlowTiltCard>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 13: FOOTER
            ================================================================ */}
        <footer
          className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-[#D4AF37]/10"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-dark-pattern.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
              <Link
                href="/privacy"
                className="text-sm text-[#a0a0a0] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-[#a0a0a0]/30">|</span>
              <Link
                href="/terms"
                className="text-sm text-[#a0a0a0] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Terms
              </Link>
              <span className="text-[#a0a0a0]/30">|</span>
              <a
                href="mailto:hello@proserefinery.com"
                className="text-sm text-[#a0a0a0] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Contact
              </a>
            </div>
            <p className="text-sm text-[#a0a0a0] mb-4">
              &copy; 2025 Prose Refinery Press. All rights reserved.
            </p>
            <p
              className="text-sm text-[#D4AF37]/70 italic"
              style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
            >
              The Archive remembers.
            </p>
          </div>
        </footer>

      </div>

      {/* Sticky CTA Bar */}
      <StickyCTA
        bookTitle="CHILDREN OF AIYE"
        onReadChapter={handleOpenModal}
        purchaseUrl="/children-of-aiye/checkout"
        price="£12.99"
      />
    </>
  );
}
