'use client';

import { useState, useCallback } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Book',
      '@id': 'https://proserefinery.com/children-of-aiye#book',
      name: 'Children of Aiyé',
      alternateName: 'Children of Aiye',
      author: {
        '@type': 'Person',
        name: 'Ola Bello',
        url: 'https://proserefinery.com/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Prose Refinery Press',
        url: 'https://proserefinery.com'
      },
      bookFormat: 'EBook',
      genre: ['Afrofuturism', 'Fantasy', 'Young Adult', 'Mythology'],
      inLanguage: 'en',
      about: [
        { '@type': 'Thing', name: 'Yoruba mythology' },
        { '@type': 'Thing', name: 'African fantasy' },
        { '@type': 'Thing', name: 'Orisha' },
        { '@type': 'Place', name: 'Lagos, Nigeria' }
      ],
      description: 'Four divine Frames. One impossible soul. An Afrofuturist epic where Yoruba gods clash in future Lagos. The mythology franchise Africa deserves.',
      url: 'https://proserefinery.com/children-of-aiye',
      image: 'https://proserefinery.com/children-of-aiye/og-image.png',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '24',
        bestRating: '5',
        worstRating: '1'
      }
    },
    {
      '@type': 'Product',
      '@id': 'https://proserefinery.com/children-of-aiye#product',
      name: 'Children of Aiyé - Volume 1',
      description: 'The first volume of the Afrofuturist fantasy epic featuring Yoruba mythology in future Lagos.',
      brand: {
        '@type': 'Brand',
        name: 'Prose Refinery Press'
      },
      offers: {
        '@type': 'Offer',
        url: 'https://proserefinery.com/children-of-aiye/checkout',
        priceCurrency: 'GBP',
        price: '12.99',
        availability: 'https://schema.org/InStock'
      }
    },
    {
      '@type': 'WebPage',
      '@id': 'https://proserefinery.com/children-of-aiye',
      url: 'https://proserefinery.com/children-of-aiye',
      name: 'Children of Aiyé — Afrofuturist Fantasy Novel | Yoruba Mythology',
      description: 'Four divine Frames. One impossible soul. An Afrofuturist epic where Yoruba gods clash in future Lagos.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://proserefinery.com/#website',
        url: 'https://proserefinery.com',
        name: 'Prose Refinery',
        publisher: {
          '@type': 'Organization',
          name: 'Prose Refinery Ltd'
        }
      }
    }
  ]
};
import { Check } from 'lucide-react';
import { TiltCard } from '@/components/effects/TiltCard';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import LeadModal from '@/components/aiye/LeadModal';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { ParticleSystem } from '@/components/effects/ParticleSystem';
import { FAQ, GlowTiltCard, AudioControl } from '@/components/aiye';
import StickyCTA from '@/components/aiye/StickyCTA';
import { Nav } from '@/components/layout/Nav';

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

  // Custom nav items for Aiye page
  const aiyeNavItems = [
    { id: 'world', label: 'The World', href: '#the-world' },
    { id: 'disciples', label: 'The Disciples', href: '#the-disciples' },
    { id: 'mission', label: 'The Mission', href: '#the-mission' },
  ];

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation - Gold variant with custom links */}
      <Nav
        variant="gold"
        navItems={aiyeNavItems}
        ctaText="Enter Aiyé"
        ctaHref="/children-of-aiye/checkout"
        availabilityText="Read Chapter 1 Free"
        showStatus={false}
        logoHref="/children-of-aiye"
      />

      {/* Sticky CTA - Mobile only */}
      <StickyCTA
        onReadChapter={handleOpenModal}
        purchaseUrl="/children-of-aiye/checkout"
        mobileOnly={true}
      />

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

          {/* Cinematic Particles (Gold/Up) - Enhanced with glowing halos */}
          <ParticleSystem
            color="#D4AF37"
            maxParticles={40}
            direction="up"
            speed={0.5}
            className="z-[5] opacity-70"
            glowIntensity="intense"
            sizeMultiplier={1.5}
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f0f0] leading-tight mb-4 sm:mb-6 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                YOUR GODS.<br />YOUR STORY.<br />FINALLY.
              </h1>
            </ClipReveal>

            {/* Subheadline & Context */}
            <Reveal delay={300}>
              <div className="space-y-3 mb-8 sm:mb-10">
                <p
                  className="text-lg sm:text-xl md:text-2xl text-[#e0e0e0] font-medium max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  The Afrofuturist epic Yoruba mythology deserves.
                </p>
                <p
                  className="text-base sm:text-lg text-[#c0c0c0] max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  Lagos, 2067. The old gods never left.
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
                  Enter Aiyé
                </MagneticButton>
                <MagneticButton
                  variant="gold-outline"
                  onClick={handleOpenModal}
                  className="px-8 py-4 sm:px-10 sm:py-5 rounded-lg text-base sm:text-lg backdrop-blur-sm bg-black/30 min-w-[200px]"
                >
                  Read Chapter 1 Free
                </MagneticButton>
              </div>
            </Reveal>
          </div>

        </section>

        {/* ================================================================
            SECTION 2: POSITIONING
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
              <div className="max-w-3xl mx-auto">
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                  The Prophecy
                </p>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-8"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Some laws cannot be broken.<br />This one was.
                </h2>
                <div
                  className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed space-y-6"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  <p>
                    Afolabi had nothing for seventeen years. Then his mother&rsquo;s pendant woke and four divine forces answered.
                  </p>
                  <p className="text-[#f0f0f0] font-bold text-xl">
                    Thunder. Tide. Storm. Forge.
                  </p>
                  <p>
                    An impossibility. A death sentence.
                  </p>
                  <p>
                    The last to carry this many was executed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            INVOCATION QUOTE
            ================================================================ */}
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <blockquote
                className="text-lg sm:text-xl md:text-2xl text-[#c0c0c0] leading-relaxed italic"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                &ldquo;This story remembers what empires tried to forget:<br className="hidden sm:inline" />
                that gods do not die when their temples burn.<br className="hidden sm:inline" />
                They sleep in the blood of their children,<br className="hidden sm:inline" />
                waiting to be called home.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            SECTION 3: THE PILLARS (THE WORLD)
            ================================================================ */}
        <section
          id="the-world"
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
                className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed"
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
                        Lagos 2067
                      </h3>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Gold-lit megacity. Ancestral shrines beside holographic skylines.
                        Floating markets over sacred waters. The old gods never left—they
                        just learned new languages.
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
                        Gods Who Stayed
                      </h3>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Yoruba Òrìṣà. Igbo Alusi. Edo spirits. They survived colonisation,
                        missionaries, and textbooks that called them myths. Now they&rsquo;re
                        choosing sides.
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
                        One Frame. One Soul.
                      </h3>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Frames channel divine power through human vessels. The rule:
                        one per soul. Afolabi broke that rule before he was born.
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
          id="the-disciples"
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
                <GlowTiltCard className="h-full" glowColor="violet">
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
                      <p className="text-sm text-[#c0c0c0] mb-4">Age 17</p>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Four Frames. Limit is one. Either the gods made a mistake
                        or he&rsquo;s their last weapon. He&rsquo;s betting on mistake.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Kehinde */}
              <Reveal delay={300}>
                <GlowTiltCard className="h-full" glowColor="silver">
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
                      <p className="text-sm text-[#c0c0c0] mb-4">Age 16 &bull; Foster Sister</p>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Reads emotions like others read street signs. In a world of
                        gods and liars, she knows when truth enters the room.
                      </p>
                    </div>
                  </div>
                </GlowTiltCard>
              </Reveal>

              {/* Taiwo */}
              <Reveal delay={400}>
                <GlowTiltCard className="h-full" glowColor="ember">
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
                      <p className="text-sm text-[#c0c0c0] mb-4">Age 16 &bull; Foster Brother</p>
                      <p
                        className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                      >
                        Sixteen years of building what others summon. His Mark-III Rig
                        channels Àṣẹ through circuits, not blood. What Taiwo builds,
                        even Òrìṣà respect.
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

          {/* Ash Particles (Down/Corruption) - Enhanced with ominous glow */}
          <ParticleSystem
            color="#556b2f" // Sickly green/ash
            maxParticles={50}
            direction="down"
            speed={0.3}
            className="z-0 opacity-50 mix-blend-screen"
            glowIntensity="medium"
            sizeMultiplier={1.3}
          />

          <div className="relative z-20 max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <p className="text-xs tracking-widest text-red-500 uppercase mb-4">
                The Àjọ̀gún
              </p>
            </Reveal>

            <ClipReveal delay={100}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-6 sm:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                What&rsquo;s Waking
              </h2>
            </ClipReveal>

            <Reveal delay={200}>
              <p
                className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed mb-8"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                They don&rsquo;t kill. They erase. When Àjọ̀gún rise, cities don&rsquo;t burn—they
                forget what they were. Names dissolve. Histories unhappen. The Grove Trials
                are opening early. Afolabi doesn&rsquo;t have time to master four Frames.
                He has to survive them.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p
                className="text-lg sm:text-xl text-red-400 italic"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                The Àjọ̀gún remember. Aiyé&rsquo;s children betrayed them once. They intend to collect.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <p
                className="text-lg sm:text-xl text-[#D4AF37] font-semibold mt-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                The covenant is broken. The children must rise.
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
          id="the-mission"
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
                className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed space-y-6 max-w-2xl mx-auto"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                <p>
                  The Greeks have their demigods. The Norse have their Avengers.
                  The Òrìṣà have been waiting.
                </p>
                <p>
                  Yoruba, Igbo, Edo traditions are not aesthetic. They are architecture.
                </p>
              </div>
            </Reveal>

            {/* Manifesto Quote */}
            <Reveal delay={400}>
              <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 max-w-2xl mx-auto">
                <blockquote
                  className="text-lg sm:text-xl text-[#f0f0f0] leading-relaxed mb-6 italic"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  &ldquo;I wanted to give African children the mythology franchise that Greek
                  and Norse kids have had for decades. Something that says: your gods are
                  just as powerful, your stories just as worthy, your culture just as
                  foundational to human imagination.&rdquo;
                </blockquote>
                <p
                  className="text-base text-[#D4AF37] text-center"
                  style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                  — Ola Bello, Lagos-raised. London-built.
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
                A Taste
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
                    className="text-base sm:text-lg md:text-xl text-[#c0c0c0] leading-relaxed italic"
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
                      className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      The saga begins. Volume One.
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
                      className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
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
                      className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
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
                      Vision
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#c0c0c0] leading-relaxed"
                      style={{ fontFamily: 'var(--font-merriweather), Merriweather, Georgia, serif' }}
                    >
                      8 cinematic sequences bringing key moments to life.
                      The Frames awaken. The gods descend.
                    </p>
                  </div>
                </GlowTiltCard>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ================================================================
            SECTION 9: TARGET AUDIENCE
            ================================================================ */}
        <section
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                  'Loved Percy Jackson. Wondered where YOUR gods were.',
                  'Done with Africa as aesthetic. Ready for Africa as source.',
                  "Want gods who don't apologise for existing.",
                  'Believe Sango deserves what Zeus has hoarded.',
                  'Ready to come home.',
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
              <p className="mt-8 text-center text-sm text-[#c0c0c0]">
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
                  {
                    question: 'Why should I trust this is authentic?',
                    answer: 'Twenty years of research. Yoruba diacritics verified. Nigerian Pidgin reviewed by native speakers. Cultural consultants, not Google.',
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
          className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(/children-of-aiye/bg-charcoal-flat.png)',
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
                  attribution: 'Tola A., Lagos',
                },
                {
                  quote: "The magic system is unlike anything I've read. Grounded in real tradition but completely fresh.",
                  attribution: 'David M., London',
                },
                {
                  quote: "I couldn't put it down. Afolabi's story grabbed me from the first page.",
                  attribution: 'Amara K., Atlanta',
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
                      <p className="text-sm text-[#c0c0c0]">
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
                    Come Home
                  </h2>
                  <p
                    className="text-5xl sm:text-6xl font-bold text-[#D4AF37] mb-4"
                    style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
                  >
                    &pound;12.99
                  </p>
                  <p className="text-sm text-[#c0c0c0] mb-8">
                    Launch price. Rising soon.
                  </p>
                  <MagneticButton
                    variant="gold"
                    href="/children-of-aiye/checkout"
                    className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-lg text-base sm:text-lg"
                  >
                    Enter Aiyé
                  </MagneticButton>
                  <p className="mt-6 text-xs text-[#c0c0c0] uppercase tracking-wider">
                    EPUB format &bull; Works everywhere &bull; 14-day guarantee
                  </p>
                </div>
              </GlowTiltCard>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
