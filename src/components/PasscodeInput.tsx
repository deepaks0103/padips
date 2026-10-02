import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CODE, PASSCODE_CONFIG } from '../data/passcodeConfig';
import { SFX } from '../utils/sound';

interface PasscodeInputProps {
  onSuccess: () => void;
}

export const PasscodeInput: React.FC<PasscodeInputProps> = ({ onSuccess }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isError || isSuccess || isChecking) return;

    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const digit = cleaned[cleaned.length - 1];
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    SFX.pop();

    if (index < 3 && digit) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === 4 && !newDigits.includes('')) {
      verifyPasscode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    }
  };

  const verifyPasscode = (enteredCode: string) => {
    setIsChecking(true);

    if (enteredCode === BIRTHDAY_CODE) {
      setIsSuccess(true);
      setIsError(false);
      SFX.sparkle();
      setTimeout(() => {
        onSuccess();
      }, 900);
    } else {
      setIsError(true);
      SFX.click();

      setTimeout(() => {
        setDigits(['', '', '', '']);
        setIsError(false);
        setIsChecking(false);
        inputRefs.current[0]?.focus();
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-3 sm:mt-5">
      <motion.div
        animate={
          isError
            ? { x: [-12, 12, -10, 10, -6, 6, 0] }
            : isSuccess
            ? { scale: [1, 1.06, 1] }
            : {}
        }
        transition={{ duration: 0.45 }}
        className="flex items-center justify-center gap-2.5 sm:gap-3.5"
      >
        {digits.map((digit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + idx * 0.08 }}
            className="relative"
          >
            <input
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={isSuccess || isChecking}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-11 h-12 sm:w-13 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl md:text-3xl font-serif font-bold rounded-lg sm:rounded-xl outline-none transition-all duration-200 select-none ${
                isError
                  ? 'bg-rose-950/40 border-2 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                  : isSuccess
                  ? 'bg-pink-950/40 border-2 border-pink-400 text-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.8)]'
                  : 'bg-[#0f0b14]/80 border border-rose-900/40 text-pink-100 focus:border-rose-500/70 focus:bg-[#150e1c] focus:shadow-[0_0_14px_rgba(244,63,94,0.35)]'
              }`}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="h-8 mt-3 sm:mt-4 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {isError ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="font-serif text-xs sm:text-sm text-rose-400 font-medium tracking-wide drop-shadow"
            >
              {PASSCODE_CONFIG.wrongCodeMessage}
            </motion.p>
          ) : isSuccess ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-xs sm:text-sm text-pink-300 font-medium tracking-wider"
            >
              Unlocking surprise... ✨
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-serif text-xs sm:text-sm text-rose-300/60 tracking-wider"
            >
              {PASSCODE_CONFIG.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
