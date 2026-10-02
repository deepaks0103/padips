import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Eye } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { SFX } from '../utils/sound';

interface OpeningHeroProps {
  onOpen: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onOpen }) => {
  const { intro } = BIRTHDAY_DATA;

  const handleOpenClick = () => {
    SFX.envelopeOpen();
    onOpen();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 py-12 relative z-10 text-center">
      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_15px_rgba(236,72,153,0.2)] backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span>{intro.badge}</span>
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
      </motion.div>

      {/* Main Greeting Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring', bounce: 0.4 }}
        className="font-cute text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8"
      >
        <span className="text-gradient-romantic drop-shadow-[0_10px_30px_rgba(236,72,153,0.3)]">
          {intro.greeting}
        </span>
      </motion.h1>

      {/* Intro Message Card with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="glass-card-glow max-w-lg w-full rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden mb-10 shadow-2xl"
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
          {intro.paragraphs.map((p: string, idx: number) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + idx * 0.15 }}
              className={`${idx === 0 ? 'font-medium text-pink-200 text-lg' : ''} whitespace-pre-line`}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Action CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(236, 72, 153, 0.6)' }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.4, delay: 1.8 }}
        onClick={handleOpenClick}
        className="relative group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-cute text-xl font-semibold shadow-[0_10px_30px_rgba(236,72,153,0.4)] flex items-center gap-3 transition-all cursor-pointer border border-pink-400/40"
      >
        <span className="relative z-10">{intro.buttonText}</span>
        <Eye className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10 text-pink-100" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </section>
  );
};
