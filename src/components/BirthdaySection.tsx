import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Flame, RefreshCw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { fireCelebrationConfetti, fireHeartConfetti } from '../utils/confetti';
import { SFX } from '../utils/sound';

export const BirthdaySection: React.FC = () => {
  const { birthday } = BIRTHDAY_DATA;
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesLit) {
      SFX.blowCandle();
      setCandlesLit(false);
      setHasBlown(true);
      setTimeout(() => {
        SFX.cheer();
        fireCelebrationConfetti();
        fireHeartConfetti();
      }, 300);
    }
  };

  const handleRelight = () => {
    SFX.sparkle();
    setCandlesLit(true);
  };

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md"
      >
        <PartyPopper className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>{birthday.badge}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
        className="font-cute text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-8 px-2"
      >
        <span className="text-gradient-romantic drop-shadow-[0_10px_35px_rgba(236,72,153,0.4)]">
          {birthday.title}
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative my-8 flex flex-col items-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />

        <div
          onClick={handleBlowCandles}
          className="relative cursor-pointer group flex flex-col items-center select-none"
        >
          <div className="flex gap-4 sm:gap-6 mb-[-6px] relative z-20">
            {[0, 1, 2].map((candleIdx) => (
              <div key={candleIdx} className="flex flex-col items-center relative">
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [1, 1.2, 0.95, 1.15, 1],
                        y: [0, -2, 1, -1, 0],
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_16px_rgba(251,191,36,0.95)] mb-1"
                    />
                  )}
                </AnimatePresence>

                <div className="w-1 h-2 bg-neutral-800" />
                <div
                  className={`w-3 h-8 sm:h-10 rounded-sm shadow-md ${
                    candleIdx === 1
                      ? 'bg-gradient-to-b from-pink-300 to-pink-500'
                      : candleIdx === 0
                      ? 'bg-gradient-to-b from-purple-300 to-purple-500'
                      : 'bg-gradient-to-b from-rose-300 to-rose-500'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="w-36 sm:w-44 h-12 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl border-t-2 border-pink-200/60 shadow-lg relative flex items-center justify-center">
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-white/40 rounded-b-xl" />
            <div className="flex gap-2">
              <span className="text-xs">🍓</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          <div className="w-52 sm:w-64 h-16 bg-gradient-to-r from-[#381e4a] via-[#4d2463] to-[#381e4a] rounded-t-xl rounded-b-2xl border-t-4 border-pink-400/40 shadow-2xl relative flex items-center justify-around px-4">
            <div className="w-2 h-2 rounded-full bg-pink-300/80 shadow" />
            <div className="w-2 h-2 rounded-full bg-pink-300/80 shadow" />
            <div className="w-2 h-2 rounded-full bg-pink-300/80 shadow" />
            <div className="w-2 h-2 rounded-full bg-pink-300/80 shadow" />
            <div className="w-2 h-2 rounded-full bg-pink-300/80 shadow" />
          </div>

          <div className="w-60 sm:w-72 h-3 bg-gradient-to-r from-neutral-400 via-white to-neutral-400 rounded-full shadow-lg mt-0.5" />
          <div className="w-24 sm:w-28 h-4 bg-gradient-to-b from-neutral-300 to-neutral-500 rounded-b-lg shadow" />
        </div>

        <div className="mt-6 text-center">
          {candlesLit ? (
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-300 font-cute text-xl sm:text-2xl flex items-center justify-center gap-2"
            >
              <span>{birthday.cakePrompt}</span>
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-cute text-2xl sm:text-3xl text-amber-300 font-bold drop-shadow">
                {birthday.cakeBlownText}
              </p>
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white/80 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-400" />
                <span>Light Candles Again 🕯️</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="glass-card-glow max-w-xl w-full rounded-3xl p-6 sm:p-9 relative overflow-hidden text-left shadow-2xl mt-4"
      >
        <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed">
          {birthday.paragraphs.map((p: string, idx: number) => (
            <p
              key={idx}
              className={`whitespace-pre-line ${
                idx === 2
                  ? 'bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20 text-pink-100 font-medium'
                  : idx === 5
                  ? 'font-cute text-3xl sm:text-4xl text-gradient-romantic font-bold pt-2'
                  : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
