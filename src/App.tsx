import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { AmbientBackground } from './components/AmbientBackground';
import { PasscodePage } from './components/PasscodePage';
import { OpeningHero } from './components/OpeningHero';
import { EnvelopeSection } from './components/EnvelopeSection';
import { MemoriesSection } from './components/MemoriesSection';
import { SongSection } from './components/SongSection';
import { BirthdaySection } from './components/BirthdaySection';
import { SpecialNoteSection } from './components/SpecialNoteSection';
import { FinalScreen } from './components/FinalScreen';
import { Volume2, VolumeX, Sparkles, KeyRound } from 'lucide-react';
import { MelodyPlayer, SFX } from './utils/sound';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState(false);
  const [hasOpenedHero, setHasOpenedHero] = useState(false);
  const [bgMusicActive, setBgMusicActive] = useState(false);

  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const memoriesRef = useRef<HTMLDivElement | null>(null);
  const songRef = useRef<HTMLDivElement | null>(null);
  const birthdayRef = useRef<HTMLDivElement | null>(null);
  const specialNoteRef = useRef<HTMLDivElement | null>(null);
  const finalScreenRef = useRef<HTMLDivElement | null>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handlePasscodeSuccess = () => {
    setIsPasscodeUnlocked(true);
  };

  const handleOpenSurprise = () => {
    setHasOpenedHero(true);
    // Automatically start relaxing synth music
    if (!MelodyPlayer.isPlaying()) {
      MelodyPlayer.start();
      setBgMusicActive(true);
    }
    // Smooth scroll down to envelope section
    setTimeout(() => {
      envelopeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  const toggleGlobalMusic = () => {
    SFX.click();
    if (bgMusicActive) {
      MelodyPlayer.stop();
      setBgMusicActive(false);
    } else {
      MelodyPlayer.start();
      setBgMusicActive(true);
    }
  };

  const handleReplay = () => {
    SFX.sparkle();
    MelodyPlayer.stop();
    setBgMusicActive(false);
    setHasOpenedHero(false);
    setIsPasscodeUnlocked(false);
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    SFX.click();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07060d] text-white relative font-sans selection:bg-pink-500 selection:text-white">
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Ambient background with floating petals & hearts */}
          <AmbientBackground />

          {/* Floating Audio Quick-Toggle (Visible once unlocked) */}
          {isPasscodeUnlocked && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleGlobalMusic}
              aria-label={bgMusicActive ? "Mute ambient music" : "Play ambient music"}
              className="fixed top-4 right-4 z-40 px-3.5 py-2 rounded-full bg-[#1b122c]/85 border border-pink-500/40 text-pink-300 text-xs font-medium backdrop-blur-md shadow-[0_4px_20px_rgba(236,72,153,0.3)] flex items-center gap-2 hover:bg-pink-500/20 transition-all cursor-pointer"
            >
              {bgMusicActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span className="hidden sm:inline font-mono">Music: Playing 🎵</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-white/60" />
                  <span className="hidden sm:inline font-mono">Music: Muted 🔇</span>
                </>
              )}
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </motion.button>
          )}

          {/* STEP 1: Passcode Screen (Passcode: 1029) */}
          {!isPasscodeUnlocked ? (
            <PasscodePage onUnlockSuccess={handlePasscodeSuccess} />
          ) : (
            /* STEP 2: Main Story & Birthday Experience */
            <main className="relative z-10">
              {/* Opening Hero Intro */}
              <OpeningHero onOpen={handleOpenSurprise} />

              {/* Interactive Sections that reveal upon opening */}
              {hasOpenedHero && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* 1. Envelope Section */}
                  <div ref={envelopeRef}>
                    <EnvelopeSection onNextSection={() => scrollToRef(memoriesRef)} />
                  </div>

                  {/* 2. Memories Section */}
                  <div ref={memoriesRef}>
                    <MemoriesSection onNextSection={() => scrollToRef(songRef)} />
                  </div>

                  {/* 3. Song Section */}
                  <div ref={songRef}>
                    <SongSection />
                  </div>

                  {/* 4. Birthday Celebration & Interactive Cake */}
                  <div ref={birthdayRef}>
                    <BirthdaySection />
                  </div>

                  {/* 5. Special Note Section */}
                  <div ref={specialNoteRef}>
                    <SpecialNoteSection />
                  </div>

                  {/* 6. Final Screen & Pop-up surprise */}
                  <div ref={finalScreenRef}>
                    <FinalScreen onReplay={handleReplay} />
                  </div>
                </motion.div>
              )}
            </main>
          )}
        </>
      )}
    </div>
  );
};
