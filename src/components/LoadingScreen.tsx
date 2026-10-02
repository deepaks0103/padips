import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white p-6 select-none"
    >
      {/* Central Glowing Sparkle & Heart */}
      <div className="relative mb-8 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent blur-xl"
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/30 border border-pink-500/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.35)]"
        >
          <Heart className="w-10 h-10 text-pink-400 fill-pink-400/60 animate-pulse" />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="w-6 h-6 text-amber-300" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-cute text-xl text-pink-200 tracking-wide mb-5 flex items-center gap-2"
      >
        <span>Loading something special...</span>
        <span className="text-pink-400">✨</span>
      </motion.p>

      {/* Progress Bar Container */}
      <div className="w-64 max-w-[80vw] h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.8)]"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>

      <p className="text-xs text-white/40 mt-3 font-mono">{progress}%</p>
    </motion.div>
  );
};
