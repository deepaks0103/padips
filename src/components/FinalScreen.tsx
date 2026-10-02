import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, RotateCcw, X } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { SFX } from '../utils/sound';
import { fireCelebrationConfetti } from '../utils/confetti';

interface FinalScreenProps {
  onReplay: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReplay }) => {
  const { finalScreen } = BIRTHDAY_DATA;
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);

  const handleOpenSurprise = () => {
    SFX.cheer();
    fireCelebrationConfetti();
    setShowSurpriseModal(true);
  };

  const handleCloseSurprise = () => {
    SFX.click();
    setShowSurpriseModal(false);
  };

  return (
    <section className="min-h-screen py-12 sm:py-20 px-3.5 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center overflow-x-hidden">
      {/* Top Floating Badge */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-5 sm:mb-6 shadow-[0_0_25px_rgba(236,72,153,0.3)] backdrop-blur-md"
      >
        <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
      </motion.div>

      {/* Main Emotional Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        className="font-cute text-[22px] sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 max-w-[92vw] sm:max-w-2xl px-2 leading-[1.3] sm:leading-tight"
      >
        <span className="text-gradient-romantic drop-shadow-[0_10px_30px_rgba(236,72,153,0.35)]">
          {finalScreen.title}
        </span>
      </motion.h2>

      {/* Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card-glow w-full max-w-[92vw] sm:max-w-xl mx-auto rounded-3xl p-5 sm:p-8 md:p-9 mb-8 text-center space-y-4 sm:space-y-5 shadow-2xl border border-pink-400/30"
      >
        {/* Paragraphs with comfortable spacing & natural mobile text wrapping */}
        <div className="space-y-3.5 sm:space-y-4 text-slate-100 text-[15px] sm:text-[17px] leading-[1.65] sm:leading-[1.75] font-normal [overflow-wrap:break-word] [word-break:normal] whitespace-pre-line tracking-normal">
          {finalScreen.paragraphs.map((p: string, idx: number) => {
            const isHighlight = p.includes('Thiruvum Shobana-vum') || p.includes('Un happiness dhaan');
            return (
              <p
                key={idx}
                className={`${
                  isHighlight
                    ? 'text-pink-200 font-medium py-0.5'
                    : ''
                }`}
              >
                {p}
              </p>
            );
          })}
        </div>

        {/* Final Three Lines Visually Standing Out */}
        {finalScreen.closingLines && finalScreen.closingLines.length > 0 && (
          <div className="pt-5 sm:pt-6 border-t border-pink-500/25 mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
            <p className="font-cute text-[18px] sm:text-2xl text-pink-300 font-bold leading-normal">
              {finalScreen.closingLines[0]}
            </p>
            <p className="font-cute text-[18px] sm:text-2xl text-pink-200 font-bold leading-normal">
              {finalScreen.closingLines[1]}
            </p>
            <p className="font-cute text-[21px] sm:text-3xl text-gradient-romantic font-bold pt-1 drop-shadow leading-normal">
              {finalScreen.closingLines[2]}
            </p>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-xs sm:max-w-none px-2 mb-10"
      >
        {/* Surprise Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(236, 72, 153, 0.6)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenSurprise}
          className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-cute text-lg sm:text-xl font-bold shadow-[0_10px_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 cursor-pointer border border-pink-400/40"
        >
          <span>{finalScreen.surpriseButtonText}</span>
          <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-spin-slow" />
        </motion.button>

        {/* Replay Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onReplay}
          className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white/85 hover:text-white text-xs sm:text-sm font-medium border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
          <span>Replay Experience</span>
        </motion.button>
      </motion.div>

      <p className="text-[11px] sm:text-xs text-white/30 font-mono pb-8">
        Made with ❤️ for Padips • Happy Birthday
      </p>

      {/* Surprise Pop-up Modal */}
      <AnimatePresence>
        {showSurpriseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={handleCloseSurprise}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] sm:max-w-md w-full bg-[#1b122c] border-2 border-pink-400/50 rounded-3xl p-6 sm:p-9 text-center shadow-[0_0_60px_rgba(236,72,153,0.45)]"
            >
              <button
                onClick={handleCloseSurprise}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-4xl sm:text-5xl mb-4 animate-bounce">
                {finalScreen.surprisePopup.emoji}
              </div>

              <h3 className="font-cute text-2xl sm:text-4xl text-pink-200 font-bold mb-4">
                {finalScreen.surprisePopup.title}
              </h3>

              <div className="space-y-3 text-slate-200 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                {finalScreen.surprisePopup.paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <button
                onClick={handleCloseSurprise}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-cute text-lg sm:text-xl font-bold shadow-lg cursor-pointer hover:opacity-95 active:scale-98 transition-all"
              >
                Smile Pannaachu! 😌❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
