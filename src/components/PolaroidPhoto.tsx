import React from 'react';
import { motion } from 'framer-motion';

interface PolaroidPhotoProps {
  imageUrl: string;
  alt?: string;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  imageUrl,
  alt = "Polaroid Photo",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 2.5 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      className="relative flex items-center justify-center my-4 sm:my-6"
    >
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-600/30 via-pink-500/25 to-rose-900/20 rounded-3xl blur-2xl pointer-events-none" />

      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <motion.div
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, type: 'spring', bounce: 0.5 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div className="relative flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.6)]">
            <svg
              width="44"
              height="36"
              viewBox="0 0 54 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform hover:scale-105 transition-transform"
            >
              <path
                d="M27 18 C 18 5, 2 8, 8 22 C 12 30, 24 24, 27 18 Z"
                fill="url(#bow-grad-left)"
                stroke="#f43f5e"
                strokeWidth="1.2"
              />
              <path
                d="M27 18 C 36 5, 52 8, 46 22 C 42 30, 30 24, 27 18 Z"
                fill="url(#bow-grad-right)"
                stroke="#f43f5e"
                strokeWidth="1.2"
              />
              <path
                d="M25 20 Q 18 36 10 38 Q 18 30 24 22 Z"
                fill="#e11d48"
                opacity="0.9"
              />
              <path
                d="M29 20 Q 36 36 44 38 Q 36 30 30 22 Z"
                fill="#be123c"
                opacity="0.9"
              />
              <circle cx="27" cy="19" r="5.5" fill="url(#knot-grad)" stroke="#fda4af" strokeWidth="1" />

              <defs>
                <linearGradient id="bow-grad-left" x1="5" y1="5" x2="27" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fb7185" />
                  <stop offset="0.6" stopColor="#e11d48" />
                  <stop offset="1" stopColor="#9f1239" />
                </linearGradient>
                <linearGradient id="bow-grad-right" x1="49" y1="5" x2="27" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fb7185" />
                  <stop offset="0.6" stopColor="#e11d48" />
                  <stop offset="1" stopColor="#9f1239" />
                </linearGradient>
                <radialGradient id="knot-grad" cx="26" cy="18" r="5.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffe4e6" />
                  <stop offset="0.5" stopColor="#f43f5e" />
                  <stop offset="1" stopColor="#881337" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        <div className="w-[200px] sm:w-[230px] md:w-[250px] bg-[#121114] border border-[#26242b] p-3 pb-8 sm:pb-10 rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(244,63,94,0.15)] flex flex-col items-center">
          <div className="relative w-full aspect-square bg-[#8253df] rounded-sm overflow-hidden border border-black/60 shadow-inner">
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover object-[center_12%] select-none"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-rose-400/10 pointer-events-none" />
          </div>

          <div className="w-full mt-2 sm:mt-3 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-rose-500/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
