import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { SFX } from '../utils/sound';

interface MemoriesSectionProps {
  onNextSection?: () => void;
}

const ROTATIONS = [-3.5, 2.8, -2.2, 3.2, -1.8, 1.5];

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ onNextSection }) => {
  const { memories } = BIRTHDAY_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPhotos = memories.items.length;
  const isCompleted = currentIndex >= totalPhotos;

  const handleTapPhoto = () => {
    if (currentIndex < totalPhotos) {
      SFX.pop();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    SFX.sparkle();
    setCurrentIndex(0);
  };

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-10 overflow-hidden">
      {/* Top Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md"
      >
        <Camera className="w-3.5 h-3.5 text-purple-400" />
        <span>{memories.badge || "Captured Moments 📸"}</span>
      </motion.div>

      {/* Main Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cute text-3xl sm:text-5xl font-bold text-center mb-8"
      >
        <span className="text-gradient-romantic">{memories.title || "Konjam memories 📸"}</span>
      </motion.h2>

      {/* Interactive Instruction Banner */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Tap the photo 👀</span>
        </motion.div>
      )}

      {/* Memory Stack Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[400px] sm:h-[460px] flex items-center justify-center my-2">
        <AnimatePresence>
          {!isCompleted ? (
            memories.items.map((item, idx) => {
              // Hide cards that have already been tapped and dismissed
              if (idx < currentIndex) return null;

              const stackPosition = idx - currentIndex;
              const rotation = ROTATIONS[idx % ROTATIONS.length];
              const isTop = stackPosition === 0;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{
                    scale: 0.85 + (1 - stackPosition * 0.04),
                    y: stackPosition * 6,
                    opacity: stackPosition < 3 ? 1 : 0.6,
                    rotate: rotation,
                  }}
                  animate={{
                    scale: Math.max(0.88, 1 - stackPosition * 0.035),
                    y: stackPosition * 5,
                    opacity: stackPosition < 4 ? 1 : 0,
                    rotate: rotation,
                  }}
                  exit={{
                    x: idx % 2 === 0 ? 320 : -320,
                    y: -60,
                    rotate: idx % 2 === 0 ? 25 : -25,
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={isTop ? handleTapPhoto : undefined}
                  style={{
                    zIndex: totalPhotos - stackPosition,
                    cursor: isTop ? 'pointer' : 'default',
                  }}
                  className="absolute w-[260px] sm:w-[310px] aspect-[3.2/4.2] bg-[#1e1333] border-2 border-pink-400/40 rounded-3xl p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(236,72,153,0.25)] flex flex-col items-center justify-between select-none active:scale-[0.98] transition-transform backdrop-blur-md"
                >
                  {/* Subtle top tape accent */}
                  <div className="w-16 h-3 bg-pink-500/20 border border-pink-400/30 rounded-sm mb-2 backdrop-blur-sm" />

                  {/* Photo Window */}
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-neutral-950 border border-pink-300/20 shadow-inner flex items-center justify-center relative">
                    <img
                      src={item.imageUrl}
                      alt={`Memory ${idx + 1}`}
                      className="w-full h-full object-cover object-center pointer-events-none"
                      loading="eager"
                    />
                  </div>

                  {/* Polaroid Bottom Border with gentle indicator */}
                  <div className="w-full pt-2 flex items-center justify-between px-1 text-[11px] text-pink-300/70 font-mono">
                    <span>Moment #{idx + 1}</span>
                    <span>{idx + 1}/{totalPhotos}</span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            /* Completed Message State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card-glow max-w-sm sm:max-w-md w-full rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center space-y-6 border border-pink-400/40 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-pink-500/15 border border-pink-400/30 flex items-center justify-center text-2xl shadow-inner">
                🥹❤️
              </div>

              <div className="space-y-3">
                <p className="font-cute text-xl sm:text-2xl text-pink-200 font-bold leading-relaxed whitespace-pre-line">
                  Sila memories photo-la mattum illa…
                  {"\n"}namma mind-la stay aagidum. 🥹❤️
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 text-pink-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-300" />
                  <span>View again</span>
                </button>

                <button
                  onClick={() => {
                    SFX.sparkle();
                    if (onNextSection) {
                      onNextSection();
                    }
                  }}
                  className="w-full sm:flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cute text-base sm:text-lg font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2 border border-pink-300/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Next → 🫶</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {memories.items.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx < currentIndex
                ? 'w-6 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]'
                : idx === currentIndex && !isCompleted
                ? 'w-7 bg-gradient-to-r from-pink-400 to-purple-400 shadow-[0_0_12px_rgba(236,72,153,0.9)] animate-pulse'
                : 'w-2.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
