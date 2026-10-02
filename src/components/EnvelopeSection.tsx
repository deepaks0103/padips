import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { SFX } from '../utils/sound';

interface EnvelopeSectionProps {
  onNextSection?: () => void;
}

export const EnvelopeSection: React.FC<EnvelopeSectionProps> = ({ onNextSection }) => {
  const { envelope } = BIRTHDAY_DATA;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      SFX.envelopeOpen();
      setIsOpen(true);
    }
  };

  return (
    <section id="envelope-section" className="min-h-screen py-16 sm:py-20 px-4 flex flex-col items-center justify-center relative z-10">
      {/* Top Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)]"
      >
        <span>{envelope.badge}</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cute text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-8"
      >
        <span className="text-gradient-romantic">{envelope.title}</span>
      </motion.h2>

      {/* Envelope / Letter Container */}
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* BEFORE OPENING: Closed Envelope */
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenEnvelope}
            className="w-full max-w-lg cursor-pointer relative group"
          >
            {/* Glowing Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-rose-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

            <div className="relative w-full aspect-[16/11] max-h-[340px] rounded-3xl bg-gradient-to-br from-[#201438] via-[#2c194a] to-[#180f2d] border-2 border-pink-500/40 p-6 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
              {/* Envelope Flap Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-pink-500/20 to-transparent border-b border-pink-400/30"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* Floating ambient icons */}
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 left-8"
              >
                <Heart className="w-5 h-5 text-pink-400/70 fill-pink-400/30" />
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4], rotate: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 right-8"
              >
                <Sparkles className="w-5 h-5 text-amber-300/80" />
              </motion.div>

              {/* Glowing Heart Button: TAP ❤️ */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-500 p-1 shadow-[0_0_30px_rgba(244,63,94,0.85)] flex items-center justify-center cursor-pointer mb-4"
              >
                <div className="w-full h-full rounded-full border-2 border-pink-100/60 flex flex-col items-center justify-center text-white bg-pink-600/60 backdrop-blur-sm shadow-inner">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white drop-shadow-md" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-sans mt-0.5">TAP ❤️</span>
                </div>
              </motion.div>

              <p className="font-cute text-2xl sm:text-3xl text-pink-200 font-bold group-hover:text-white transition-colors relative z-10">
                {envelope.sealText}
              </p>
              <p className="text-xs sm:text-sm text-pink-300/70 mt-1 relative z-10 font-normal">
                {envelope.smallText || "Oru small letter waiting for you ✨"}
              </p>
            </div>
          </motion.div>
        ) : (
          /* AFTER TAPPING THE HEART: Letter Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            className="w-full relative"
          >
            {/* Ambient decorative elements */}
            <div className="absolute -top-7 -left-3 text-3xl animate-bounce">🌸</div>
            <div className="absolute -bottom-4 -right-3 text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
            <div className="absolute top-1/4 -left-5 text-2xl animate-pulse">💖</div>
            <div className="absolute top-2/3 -right-5 text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🌺</div>

            {/* Glowing Letter Card with Scrollable Body */}
            <div className="glass-card-glow rounded-3xl p-6 sm:p-9 relative overflow-hidden border border-pink-400/40 shadow-[0_20px_60px_rgba(236,72,153,0.3)]">
              {/* Top Pink Line Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500" />

              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💌</span>
                  <h3 className="font-cute text-2xl sm:text-3xl text-pink-200 font-bold">
                    {envelope.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
                  <Check className="w-3.5 h-3.5 text-pink-400" />
                  <span>Unsealed</span>
                </div>
              </div>

              {/* Scrollable Letter Content on Mobile & Desktop */}
              <div className="max-h-[62vh] sm:max-h-[68vh] overflow-y-auto pr-2 space-y-4 text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                {envelope.paragraphs.map((p: string, idx: number) => {
                  const isMainGreeting = idx === 0;
                  const isSpecialEmphasis = p.includes('I genuinely care') || p.includes('gem maari') || p.includes('Happy Birthday once again');

                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.9) }}
                      className={`whitespace-pre-line ${
                        isMainGreeting
                          ? 'font-cute text-3xl sm:text-4xl text-pink-300 font-bold pb-1'
                          : isSpecialEmphasis
                          ? 'text-pink-200 font-medium'
                          : ''
                      }`}
                    >
                      {p}
                    </motion.p>
                  );
                })}
              </div>

              {/* Letter Footer */}
              <div className="mt-6 pt-4 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-2 text-pink-300">
                <span className="font-cute text-xl sm:text-2xl font-bold flex items-center gap-1.5">
                  <span>Best friends always</span>
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400 inline" />
                </span>
                <span className="text-xs text-white/50">{envelope.footerNote}</span>
              </div>
            </div>

            {/* Next Chapter CTA Button */}
            {onNextSection && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onNextSection}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 text-sm font-medium transition-all cursor-pointer hover:scale-105 shadow-md"
                >
                  <span>See Memories Next</span>
                  <ArrowRight className="w-4 h-4 text-pink-400" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Down indicator */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col items-center text-pink-400/70 text-xs"
        >
          <span className="mb-1 font-mono">Scroll for more memories</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
};
