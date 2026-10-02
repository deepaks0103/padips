import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarBackground } from './StarBackground';
import { PolaroidPhoto } from './PolaroidPhoto';
import { PasscodeInput } from './PasscodeInput';
import { PASSCODE_CONFIG } from '../data/passcodeConfig';

interface PasscodePageProps {
  onUnlockSuccess?: () => void;
}

export const PasscodePage: React.FC<PasscodePageProps> = ({ onUnlockSuccess }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSuccess = () => {
    setIsUnlocked(true);
    if (onUnlockSuccess) {
      setTimeout(() => {
        onUnlockSuccess();
      }, 700);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocked ? (
        <motion.div
          key="passcode-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 0.7, ease: 'easeInOut' } }}
          className="relative w-screen h-screen max-h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-center px-4 select-none"
        >
          <StarBackground />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm sm:max-w-md w-full my-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.22em] text-[#e8708c] uppercase drop-shadow-[0_0_18px_rgba(232,112,140,0.45)] mb-2"
            >
              {PASSCODE_CONFIG.heading}
            </motion.h1>

            <PolaroidPhoto
              imageUrl={PASSCODE_CONFIG.photoUrl}
              alt={PASSCODE_CONFIG.photoAlt}
            />

            <PasscodeInput onSuccess={handleSuccess} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="unlocked-screen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-screen h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-6"
        >
          <StarBackground />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <p className="font-serif text-3xl sm:text-4xl text-rose-300 font-semibold tracking-wider mb-2">
              Access Granted ✨
            </p>
            <p className="text-sm text-pink-200/60 font-serif tracking-widest">
              Unlocking surprise...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
