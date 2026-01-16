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
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { ParticleSystem } from '@/components/effects/ParticleSystem';
import { FAQ, StickyCTA, GlowTiltCard, AudioControl } from '@/components/aiye';

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

      {/* Cinematic Film Grain Overlay (Fixed) */}
      <NoiseOverlay opacity={0.04} />

      {/* Ambient Audio Toggle */}
      <AudioControl />

      <div className="bg-[#0a0a0a] min-h-screen">
        {/* ================================================================
            SECTION 1: HERO (100vh)
            ================================================================ */}
        {/* ================================================================
            SECTION 1: HERO (Cinematic Full Width)
            ================================================================ */}
        <section className="relative min-h-screen flex items-end sm:items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-0 overflow-hidden">
          {/* Background Image (Fixed/Parallax feel) */}
          {/* =================================================================
              MOBILE BACKGROUND (Standard Cover < md)
              ================================================================= */}
          <div className="absolute inset-0 z-0 md:hidden">
            <Image
              src="/children-of-aiye/cover-premium-clean.png"
              alt="Afolabi gazing at the Future Lagos skyline"
              fill
              className="object-cover object-[50%_15%]"
              priority
              quality={90}
            />
            {/* Mobile-only dimmer to ensure text pop */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* =================================================================
              DESKTOP BACKGROUND (Cinematic Blur Pillars >= md)
              ================================================================= */}
          <div className="absolute inset-0 z-0 hidden md:block overflow-hidden bg-black">
            {/* Layer 1: Ambient Blur Background (The Atmosphere) 
                Scale 1.1 to hide blur edges. 
            */}
            <div className="absolute inset-0 transform scale-110">
              <Image
                src="/children-of-aiye/cover-premium-clean.png"
                alt=""
                fill
                className="object-cover object-center blur-[40px] opacity-50"
                priority
              />
            </div>

            {/* Layer 2: Seamless Vignette (The Seam Hider) 
                Hides the transition between blur and black edges.
            */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />

            {/* Layer 3: Sharp Foreground (The Art) 
                Contained to viewport height to prevent cropping.
                Max-width constrained to prevent "floating in void" on ultrawide.
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[1600px] max-h-[100vh]">
                <Image
                  src="/children-of-aiye/cover-premium-clean.png"
                  alt="Afolabi gazing at the Future Lagos skyline"
                  fill
                  className="object-contain object-center drop-shadow-2xl"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>

          {/* Cinematic Particles (Gold/Up) */}
          <ParticleSystem
            color="#D4AF37"
            maxParticles={30}
            direction="up"
            speed={0.5}
            className="z-[5] opacity-60"
          />

          {/* Cinema Gradient Overlay - Strengthened for Mobile Readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 sm:via-[#0a0a0a]/40 to-transparent" />

          {/* Content */}
          <div className="relative z-20 w-full max-w-4xl mx-auto text-center mt-32 sm:mt-0">
            {/* Pre-headline */}
            <Reveal delay={0}>
              <p className="text-xs sm:text-sm tracking-[0.2em] text-[#D4AF37] uppercase mb-4 sm:mb-6 font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Volume One: The Divine Fall
              </p>
            </Reveal>

            {/* Main Headline */}
            <ClipReveal delay={100}>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#f0f0f0] leading-tight mb-4 sm:mb-6 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                FOUR DIVINE FRAMES.<br className="hidden sm:block" /> ONE BODY.
              </h1>
            </ClipReveal>

            {/* Subheadline & Context */}
            <Reveal delay={300}>
              <div className="space-y-4 mb-8 sm:mb-10">
                <p
                  className="text-lg sm:text-xl md:text-2xl text-[#e0e0e0] font-medium max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  An impossibility that marks him as humanity&rsquo;s last hope—or its greatest threat.
                </p>
                <p className="text-sm sm:text-base text-[#D4AF37] uppercase tracking-wider font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  A divine-anomaly epic in a future Lagos where gods and tech share a bloodstream.
                </p>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MagneticButton
                  variant="gold"
                  href="/children-of-aiye/checkout"
                  className="px-8 py-4 sm:px-10 sm:py-5 rounded-lg text-base sm:text-lg font-bold min-w-[200px] shadow-xl shadow-black/50"
                >
                  ENTER THE WORLD
                </MagneticButton>
                <MagneticButton
                  variant="gold-outline"
                  onClick={handleOpenModal}
                  className="px-8 py-4 sm:px-10 sm:py-5 rounded-lg text-base sm:text-lg backdrop-blur-sm bg-black/30 min-w-[200px]"
                >
                  Read Chapter 1
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          {/* Scroll Prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:flex flex-col items-center gap-2 opacity-70">
            <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Scroll to Discover</span>
            <svg
              className="w-5 h-5 text-[#D4AF37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
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
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="max-w-3xl mx-auto">
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The Prophecy
                </p>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-8"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Every generation, gods choose disciples to defend reality.
                </h2>
                <div
                  className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed space-y-6"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  <p>
                    For seventeen years, Afolabi had no power. No Frame. No future.
                  </p>
                  <p>
                    Then his mother&rsquo;s pendant awakened, revealing she made a sacrifice to ensure four
                    divine forces were bound to his soul before she vanished.
                  </p>
                  <p className="text-[#f0f0f0] font-bold text-xl">
                    Thunder. Tide. Storm. Forge.
                  </p>
                  <p>
                    An impossibility. A death sentence. A war waiting to ignite.
                    The last person to carry this many was executed for what she held.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 3: THE PILLARS (THE WORLD)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                  Where Power Lives
                </h2>
              </ClipReveal>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16">
              <p
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                2067. Lagos breathes neon and prayer. Solar-punk towers rise above
                ancestral shrines. In the sacred groves of Ilé-Ifẹ̀, 1,400 disciples
                from forty nations train to fight reality-consuming Àjọ̀gún.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Future Lagos */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/future-lagos-concept.png"
                        alt="Future Lagos - Solar-punk megacity"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                        2067. A gold-lit megacity where ancestral shrines rise beside
                        holographic skylines. The old gods never left. They just
                        learned to speak through new technology.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 2: African Cosmologies */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/african-cosmologies-concept.png"
                        alt="African Cosmologies - Divine forces"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                        Yoruba Òrìṣà. Igbo Alusi. Edo spirits. The divine forces
                        of West African tradition clash and collaborate in a war
                        that&rsquo;s been brewing since before colonization.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 3: The Frame System */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/frame-system-concept.png"
                        alt="The Frame System - Divine power channels"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                        Divine Frames channel Òrìṣà power through human vessels.
                        One person, one Frame. Unless you&rsquo;re the anomaly that
                        breaks every rule the gods ever made.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 4: THE TRIO (THE DISCIPLES)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
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
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/afolabi-character-art.png"
                        alt="Afolabi - The Anomaly"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Kehinde */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/kehinde-character-art.png"
                        alt="Kehinde - The Anchor"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                      <p className="text-sm text-[#a0a0a0] mb-4">Age 16 &bull; Foster Sister</p>
                      <p
                        className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Reads emotions like others read street signs. In a world of
                        lies and divine manipulation, she&rsquo;s the only one who
                        can tell when the truth walks into the room.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Taiwo */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/taiwo-character-art.png"
                        alt="Taiwo - The Builder"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                      <p className="text-sm text-[#a0a0a0] mb-4">Age 16 &bull; Foster Brother</p>
                      <p
                        className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Distrust for his powers. Just sixteen years of building what others summon.
                        His Mark-III Rig channels Àṣẹ (divine force) through circuits instead of blood.
                        What he builds, even Òrìṣà (deities) respect.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 5: THE THREAT
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden group"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(26, 5, 5, 0.95), rgba(42, 10, 10, 0.95)), url(/children-of-aiye/bg-luxury-matte.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Corruption Vignette & Atmosphere */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] mix-blend-multiply z-10" />
          <div className="absolute inset-0 pointer-events-none bg-[#2d4a3e]/10 mix-blend-overlay z-10" />

          {/* Ash Particles (Down/Corruption) */}
          <ParticleSystem
            color="#556b2f" // Sickly green/ash
            maxParticles={40}
            direction="down"
            speed={0.3}
            className="z-0 opacity-40 mix-blend-screen"
          />

          <div className="relative z-20 max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-red-500 uppercase mb-4">
                The Corruption
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-6 sm:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                The Àjọ̀gún Are Waking
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <p
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-8"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                They are called Àjọ̀gún (reality-devouring spirits). They do not just kill. They erase.
                <br /><br />
                When they rise, cities do not only burn. They forget what they were.
                <br /><br />
                A disturbance in the north was only the beginning. Now the Grove Trials are opening again.
                They are ancient rites built to test disciples and expose the rot inside them.
                <br /><br />
                Afolabi does not have time to learn how to carry four Frames.
                He has to learn how not to be consumed by them.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p
                className="text-lg sm:text-xl text-red-400 italic"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                And they remember the children of Aiyé betrayed them.
              </p>
            </Reveal>
          </div>

          {/* CRITICAL: Threat Sentinel for scroll-based interactions */}
          <div id="threat-sentinel" aria-hidden="true" />
        </section>

        {/* ================================================================
            SECTION 6: THE MISSION
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                THE MISSION
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Why This Exists
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <div
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed space-y-6 max-w-2xl mx-auto"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                <p>
                  Children of Aiyé exists to do for West African cosmology what modern myth fantasy did for Greece and the North, without dilution.
                </p>
                <p>
                  Yoruba, Igbo, Edo traditions are not aesthetic. They are architecture.
                </p>
                <p className="text-[#f0f0f0] font-bold text-xl">
                  This story is built with correct diacritics, authentic Nigerian voice, and cultural verification, because the world deserves the real thing.
                </p>
              </div>
            </Reveal>

            {/* Small Footer Text */}
            <Reveal delay={400}>
              <div
                className="mt-12 pt-8 border-t border-[#D4AF37]/20 max-w-xl mx-auto"
              >
                <p
                  className="text-xs sm:text-sm text-[#777] italic"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  &ldquo;From the creator: 20 years of research. Proper diacritical marks.
                  Authentic Nigerian Pidgin. Cultural accuracy verified.
                  This isn&rsquo;t inspired by Africa. This IS Africa.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 7: TASTE TEST
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                    holographic billboards praising the Òrìṣà, and streets that remember everyone who walks them.
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
            SECTION 8: WHAT YOU GET (THE EXPERIENCE)
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#111111]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto">
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
                  The Offering
                </h2>
              </ClipReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Feature 1: The Complete Volume */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Novel
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#f0f0f0] mb-4"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      The Complete Volume
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      111,093 words across 20 chapters. Publication-ready prose
                      polished through 16 editorial passes.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Feature 2: Illustrated Edition */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Art
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
                      21 commissioned artworks. Every chapter opens with original
                      art that brings the world to life.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Feature 3: Original Soundtrack */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Audio
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
                      16 Afrobeats tracks created for the series. Listen while
                      you read. Feel the Lagos streets.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Feature 4: Animated Content */}
              <Reveal delay={500}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 sm:p-8 h-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                        Video
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#f0f0f0] mb-4"
                      style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                    >
                      Animated Content
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      8 Veo AI videos visualising key moments. See the Frames
                      awaken. Watch the gods descend.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
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
                    holographic billboards praising the Òrìṣà, and streets that remember everyone who walks them.
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
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                  Where Power Lives
                </h2>
              </ClipReveal>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16">
              <p
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                2067. Lagos breathes neon and prayer. Solar-punk towers rise above
                ancestral shrines. In the sacred groves of Ilé-Ifẹ̀, 1,400 disciples
                from forty nations train to fight reality-consuming Àjọ̀gún.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Future Lagos */}
              <Reveal delay={200}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/future-lagos-concept.png"
                        alt="Future Lagos - Solar-punk megacity"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 2: African Cosmologies */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/african-cosmologies-concept.png"
                        alt="African Cosmologies - Divine forces"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                        Yoruba Òrìṣà. Igbo Alusi. Edo spirits. The divine forces
                        of West African tradition clash and collaborate in a war
                        that&rsquo;s been brewing since before colonization.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Card 3: The Frame System */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#0a0a0a] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/children-of-aiye/frame-system-concept.png"
                        alt="The Frame System - Divine power channels"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                        Divine Frames channel Òrìṣà power through human vessels.
                        One person, one Frame. Unless you&rsquo;re the anomaly that
                        breaks every rule the gods ever made.
                      </p>
                    </div>
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
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
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
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/afolabi-character-art.png"
                        alt="Afolabi - The Anomaly"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Kehinde */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/kehinde-character-art.png"
                        alt="Kehinde - The Anchor"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Taiwo */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full">
                  <div className="bg-[#111111] rounded-xl overflow-hidden h-full">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/children-of-aiye/taiwo-character-art.png"
                        alt="Taiwo - The Builder"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
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
                      <p className="text-sm text-[#a0a0a0] mb-4">Age 16 &bull; Foster Brother</p>
                      <p
                        className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        No divine gift. Just sixteen years of building what others summon.
                        His Mark-III Rig channels Àṣẹ through circuits instead of blood.
                        What he builds, even Òrìṣà respect.
                      </p>
                    </div>
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
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden group"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(26, 5, 5, 0.95), rgba(42, 10, 10, 0.95)), url(/children-of-aiye/bg-luxury-matte.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Corruption Vignette & Atmosphere */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] mix-blend-multiply z-10" />
          <div className="absolute inset-0 pointer-events-none bg-[#2d4a3e]/10 mix-blend-overlay z-10" />

          {/* Ash Particles (Down/Corruption) */}
          <ParticleSystem
            color="#556b2f" // Sickly green/ash
            maxParticles={40}
            direction="down"
            speed={0.3}
            className="z-0 opacity-40 mix-blend-screen"
          />

          <div className="relative z-20 max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-red-500 uppercase mb-4">
                The Corruption
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-6 sm:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                The Àjọ̀gún Are Waking
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <p
                className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-8"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                They are called Àjọ̀gún. Malevolent. Metaphysical.
                Reality-consuming forces that have begun devouring African cities.
                <br /><br />
                When Greater Àjọ̀gún struck Kano, hundreds died in minutes.
                Disciples fell. Defences shattered. The war everyone feared
                had arrived—and humanity wasn&rsquo;t ready.
                <br /><br />
                Now Afolabi must enter the Grove trials.
                Unlock powers he can barely control.
                Face an apocalypse that even his full strength cannot stop.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p
                className="text-lg sm:text-xl text-red-400 italic"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                And they remember the children of Àiyé betrayed them.
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
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                  The Offering
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
                      Premium illustrated EPUB that brings the world of Àiyé to life.
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
                      Atmospheric score composed for the world of Àiyé.
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
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <Reveal delay={0}>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The Creator
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
                      Ola is a Nigerian writer who spent twenty years building
                      this universe—researching Yoruba cosmology, perfecting linguistic
                      accuracy, crafting the Pantheon Singularity&trade; framework that makes
                      global mythological crossover possible without appropriation.
                    </p>
                    <p>
                      Born Lagos. Raised London. Building worlds between both.
                    </p>
                    <p>
                      &ldquo;I wanted to give African children the mythology franchise that
                      Greek and Norse kids have had for decades. Something that says:
                      your gods are just as powerful, your stories just as worthy,
                      your culture just as foundational to human imagination.&rdquo;
                    </p>
                  </div>
                  <p
                    className="mt-8 text-lg text-[#D4AF37]"
                    style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                  >
                    @proserefinery
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
            backgroundImage: 'url(/children-of-aiye/bg-charcoal-flat.png)',
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
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
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
                    answer: 'Children of Àiyé is Volume 1 of a planned series. Volume 2 is in development. Newsletter subscribers get first access to announcements.',
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
            backgroundImage: 'url(/children-of-aiye/bg-charcoal-flat.png)',
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
            backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
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
                    Enter Aiyé
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
              &copy; 2026 Prose Refinery Press. All rights reserved.
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
        bookTitle="CHILDREN OF AIYÉ"
        onReadChapter={handleOpenModal}
        purchaseUrl="/children-of-aiye/checkout"
        price="£12.99"
      />
    </>
  );
}
