'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown, Instagram, Plus, Minus } from 'lucide-react'
import AmberMistParticlesCanvas from '@/components/amber-mist-particles'

export default function ZaytoudLanding() {
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 1000], [0, 300])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const springConfig = { damping: 25, stiffness: 300 }
  const mouseSpring = useSpring(mousePosition, springConfig)

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=I%20want%20to%20join%20Zaytoud%20waitlist', '_blank')
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Amber Floating Mist Particles */}
      <AmberMistParticlesCanvas />

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Volumetric Lighting Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black" />
        
        {/* Hero Product Image */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateX(${mouseSpring.x * 10}px) translateY(${mouseSpring.y * 10}px)`
          }}
        >
          <div className="relative w-full h-full max-h-screen">
            <motion.img
              src="/images/hero.png"
              alt="ZAYTOUD Amber Serum Bottle"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/80" />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-3xl blur-3xl" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-b from-amber-200 to-amber-600 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
              fontFamily: 'Cinzel Decorative, cursive',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            ZAYTOUD
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-light mb-4 text-amber-100"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Nourish. Flourish. Bloom.
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-amber-50/80 mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            The art of perfumed haircare.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="space-y-4"
          >
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
            >
              Join Waitlist / Preorder Now
            </Button>
            
            <p className="text-sm text-amber-200/60">
              Exclusive early-bird offer for first 50 orders.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-amber-400/60" />
        </motion.div>
      </motion.section>

      {/* Unique Selling Points */}
      <motion.section 
        className="relative py-24 px-4 bg-gradient-to-b from-black via-amber-950/8 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        {/* Enhanced background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/15 via-transparent to-amber-900/15" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-center mb-20 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            Why ZAYTOUD Stands Apart
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                icon: "🏆",
                title: "Pakistan's First Perfumed Hair & Beard Serum",
                description: "Pioneering luxury fragrance-infused haircare in the region",
                highlight: true
              },
              {
                icon: "💧",
                title: "Non-Greasy, Fast-Absorbing Formula",
                description: "Lightweight texture that melts into hair without residue",
                highlight: false
              },
              {
                icon: "🌿",
                title: "Rich in Premium Vitamins & Botanicals",
                description: "Vitamin E, Pumpkin Seed, Argan, Jojoba, Coconut (MCT), Grapeseed, Sweet Almond, Black Seed",
                highlight: false
              },
              {
                icon: "🌱",
                title: "Natural Extracts",
                description: "Carefully selected botanical extracts for hair wellness",
                highlight: false
              },
              {
                icon: "🌸",
                title: "100% Natural Fragrances",
                description: "Only pure essential oils - Rosemary, Lavender, Sandalwood & more",
                highlight: false
              },
              {
                icon: "🇵🇰",
                title: "Proudly Crafted in Pakistan",
                description: "Made with passion and precision in our homeland",
                highlight: true
              }
            ].map((usp, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-500 group ${
                  usp.highlight 
                    ? 'bg-gradient-to-br from-amber-900/25 to-amber-800/15 border-amber-400/40 hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-400/30' 
                    : 'bg-black/50 border-amber-900/30 hover:border-amber-800/50 hover:bg-amber-950/20'
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{usp.icon}</div>
                
                {/* Title */}
                <h3 className={`text-xl md:text-2xl mb-4 font-serif leading-tight ${
                  usp.highlight ? 'text-amber-100' : 'text-amber-50'
                }`}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600
                }}>
                  {usp.title}
                </h3>
                
                {/* Description */}
                <p className={`text-base md:text-lg leading-relaxed ${
                  usp.highlight ? 'text-amber-200/90' : 'text-amber-100/75'
                }`}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic'
                }}>
                  {usp.description}
                </p>
                
                {/* Enhanced glow effect for highlighted items */}
                {usp.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 to-amber-600/5 rounded-3xl pointer-events-none" />
                )}
                
                {/* Subtle border animation on hover */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-amber-400/20 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced decorative line */}
          <motion.div 
            className="mt-20 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>

      {/* About ZAYTOUD Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        {/* Enhanced Amber Glow Sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-900/25 via-amber-800/15 to-transparent"
          initial={{ x: '-100%' }}
          whileInView={{ x: '0%' }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        

        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl mb-12 bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            About ZAYTOUD
          </motion.h2>
          
          <motion.div 
            className="space-y-10 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-serif mb-8 text-amber-100"
              style={{
                fontFamily: 'Cinzel Decorative, cursive',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}>
                Nature, Luxury, and Scent in One.
              </h3>
            </motion.div>
            
            {/* Main content */}
            <div className="space-y-8 text-xl md:text-2xl text-amber-50/85 leading-relaxed"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                Pakistan's first perfumed hair serum, made with 9 pure oils — Coconut, Jojoba, Argan, Almond, Grapeseed, Pumpkin Seed, Fenugreek, Amla, and Vitamin E — blended with therapeutic essential oils like Sandalwood, Rosewood, and Lavender.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.4 }}
                viewport={{ once: true }}
              >
                Lightweight, non-greasy, and chemical-free — Zaytoud nourishes, strengthens, and scents your hair the natural way.
              </motion.p>
            </div>
            
            {/* Feature highlights */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-700/30">
                <div className="text-3xl mb-3">🌿</div>
                <h4 className="text-lg font-serif text-amber-100 mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  9 Pure Oils
                </h4>
                <p className="text-sm text-amber-200/70"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  Nature's finest ingredients
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-700/30">
                <div className="text-3xl mb-3">🌸</div>
                <h4 className="text-lg font-serif text-amber-100 mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Therapeutic Scents
                </h4>
                <p className="text-sm text-amber-200/70"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  Essential oil blends
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-700/30">
                <div className="text-3xl mb-3">✨</div>
                <h4 className="text-lg font-serif text-amber-100 mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Chemical-Free
                </h4>
                <p className="text-sm text-amber-200/70"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  Pure and natural
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

    

      {/* FAQ Section */}
      <motion.section 
        className="relative py-24 px-4 bg-gradient-to-b from-black via-amber-950/8 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        {/* Enhanced background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-center mb-20 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            FAQ — Everything You Want to Know About Zaytoud
          </motion.h2>
          
          <div className="space-y-4">
            {[
              {
                question: "What is Zaytoud?",
                answer: "Zaytoud is Pakistan's first perfumed hair serum, crafted with 100% natural carrier and essential oils. It nourishes your hair while leaving a luxurious, long-lasting scent — without any chemicals or heaviness."
              },
              {
                question: "Is it for men or women?",
                answer: "Both. Zaytoud is completely unisex, designed for anyone who wants naturally strong, great-smelling hair."
              },
              {
                question: "Is it greasy like normal hair oils?",
                answer: "Not at all. Zaytoud uses lightweight oils like jojoba, grapeseed, and fractionated coconut — it absorbs fast, smooths frizz, and never feels sticky."
              },
              {
                question: "Does it contain alcohol like hair mists or sprays?",
                answer: "No. Zaytoud is 100% alcohol-free. Hair mists with alcohol can dry or weaken strands; ours does the opposite — it hydrates, nourishes, and protects."
              },
              {
                question: "Can it cause irritation or side effects?",
                answer: "Zaytoud is made only with natural essential oils, but sensitive scalps can sometimes react to strong botanicals. Always do a patch test before use. There are no synthetic fragrances or harsh chemicals — so irritation is rare and usually mild if it occurs."
              },
              {
                question: "Does it cause dandruff, lice, or hair fall?",
                answer: "No. In fact, many of our oils — like black seed, rosemary, and lavender — help naturally support scalp health, strengthen roots, and keep lice away. Zaytoud has no alcohol, parabens, or silicone, so it does not cause hair fall or buildup."
              },
              {
                question: "What makes Zaytoud unique?",
                answer: "It's Pakistan's first perfumed, all-natural, non-greasy hair serum made with 9 nutrient-rich oils and pure essential oils. No fake scents. No harmful ingredients. Just natural care that smells divine."
              },
              {
                question: "How do I use it?",
                answer: "Apply 2–4 drops on damp or dry hair, focusing on mid-lengths and ends. Use daily for softness, shine, and a natural scent that lasts."
              },
              {
                question: "Can it be used on the beard?",
                answer: "Yes. It's safe for facial hair too — it softens, tames, and adds a light, clean aroma."
              },
              {
                question: "Is it safe for colored or treated hair?",
                answer: "Completely. Zaytoud helps repair and protect chemically treated hair instead of stripping it — perfect for dyed, bleached, or heat-styled hair."
              },
              {
                question: "Where can I buy it?",
                answer: "Join the WhatsApp waitlist to get early access and exclusive launch discounts before Zaytoud officially drops."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="relative bg-black/50 border border-amber-900/30 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-800/50 hover:bg-amber-950/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-amber-100 pr-4"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontWeight: 600
                    }}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <Minus className="w-6 h-6 text-amber-400 transition-transform duration-300" />
                    ) : (
                      <Plus className="w-6 h-6 text-amber-400 transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-amber-50/80 leading-relaxed text-lg"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontStyle: 'italic'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
                
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced decorative line */}
          <motion.div 
            className="mt-20 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.5 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>

      {/* Waitlist / Preorder Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        {/* Gold Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Be the First to Experience ZAYTOUD
          </motion.h2>
          
          <motion.div 
            className="space-y-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-amber-50 leading-relaxed"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic'
            }}>
              The wait is almost over — and this is your moment to join Pakistan's 
              <span className="text-amber-100 font-semibold"> first perfumed, all-natural hair serum </span>
              movement.
            </p>
            
            <div className="inline-block">
              <div className="bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-400/30 rounded-2xl px-6 py-4">
                <p className="text-amber-100 font-bold text-lg mb-2">
                  🔥 Limited Launch: Only 50 Bottles in the First Batch
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-12 py-6 text-xl rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/50 transform hover:scale-105"
            >
              Join the Waitlist for Free
            </Button>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-400/40 rounded-2xl p-6 text-center transition-all duration-500 hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-3">✨</div>
                <h4 className="text-amber-100 font-bold text-lg mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600
                  }}>
                  25% OFF
                </h4>
                <p className="text-amber-50/80 text-sm leading-relaxed"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic'
                  }}>
                  Exclusive preorder pricing — only for early supporters
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-400/40 rounded-2xl p-6 text-center transition-all duration-500 hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-3">🤲</div>
                <h4 className="text-amber-100 font-bold text-lg mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600
                  }}>
                  Personal Touch
                </h4>
                <p className="text-amber-50/80 text-sm leading-relaxed"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic'
                  }}>
                  Hand-packed bottles with handwritten thank-you note from the founder
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-400/40 rounded-2xl p-6 text-center transition-all duration-500 hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-3">🚚</div>
                <h4 className="text-amber-100 font-bold text-lg mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600
                  }}>
                  Free Delivery
                </h4>
                <p className="text-amber-50/80 text-sm leading-relaxed"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic'
                  }}>
                  Anywhere in Pakistan for all preorders
                </p>
              </motion.div>
            </div>
            
            <div className="pt-6 border-t border-amber-900/30">
              <p className="text-amber-50/70 text-base mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif'
                }}>
                No commitment, no payment — just join the list, claim your early spot, and get first access when Zaytoud launches.
              </p>
              
              <p className="text-amber-100 text-xl font-serif"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}>
                <strong>Zaytoud</strong> — where nature, luxury, and scent come together.
              </p>
            </div>
          </motion.div>
        </div>


      </motion.section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-b from-amber-950/20 to-black border-t border-amber-900/30 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Cinzel Decorative, cursive',
                  fontWeight: 700
                }}
              >
                ZAYTOUD
              </motion.h3>
              <p className="text-amber-100/80 mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic'
                }}>
                Nourish. Flourish. Bloom.
              </p>
              <p className="text-amber-50/60 text-sm"
                style={{
                  fontFamily: 'Cormorant Garamond, serif'
                }}>
                Pakistan's first perfumed hair serum
              </p>
            </motion.div>

            {/* Contact & Social */}
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-serif mb-4 text-amber-100"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600
                }}>
                Connect With Us
              </h4>
              <motion.a
                href="https://instagram.com/zaytoud.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-amber-200/80 hover:text-amber-100 transition-all duration-500 group mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Instagram className="w-6 h-6" />
                <span className="text-lg">@zaytoud.pk</span>
              </motion.a>
              <p className="text-amber-50/60 text-sm"
                style={{
                  fontFamily: 'Cormorant Garamond, serif'
                }}>
                Follow us for updates and exclusive offers
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}