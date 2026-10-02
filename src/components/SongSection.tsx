import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, Headphones, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';
import { SFX } from '../utils/sound';

export const SongSection: React.FC = () => {
  const { song } = BIRTHDAY_DATA;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(165); // default fallback
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    SFX.pop();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Audio play error:", err);
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || duration;
      setCurrentTime(Math.floor(cur));
      setProgress((cur / dur) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    const targetSec = (val / 100) * (audioRef.current?.duration || duration);
    setCurrentTime(Math.floor(targetSec));
    if (audioRef.current) {
      audioRef.current.currentTime = targetSec;
    }
  };

  const toggleMute = () => {
    SFX.click();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-10 overflow-x-hidden">
      {/* Audio element (no autoplay, user-tapped playback) */}
      <audio
        ref={audioRef}
        src={song.audioUrl || "/song.mp3"}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }}
      />

      {/* Top Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md"
      >
        <Headphones className="w-3.5 h-3.5 text-pink-400" />
        <span>{song.badge}</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cute text-3xl sm:text-5xl font-bold text-center mb-6"
      >
        <span className="text-gradient-romantic">{song.title}</span>
      </motion.h2>

      {/* Message Description Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card max-w-lg w-full rounded-2xl p-6 mb-10 text-center space-y-3.5"
      >
        {song.paragraphs.map((p: string, idx: number) => (
          <p
            key={idx}
            className={`text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line ${idx === 0 ? 'text-pink-200' : ''
              }`}
          >
            {p}
          </p>
        ))}
      </motion.div>

      {/* Music Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card-glow max-w-md w-full rounded-3xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden shadow-2xl border border-pink-400/30"
      >
        {/* Glow ambient background */}
        <div
          className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl transition-opacity duration-700 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-30'
            }`}
        />

        {/* Circular Album Artwork */}
        <div className="relative mb-6 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-neutral-950 border-4 border-pink-400/50 flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative aspect-square ${
              isPlaying ? 'ring-4 ring-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.4)]' : ''
            }`}
            style={{ borderRadius: '50%' }}
          >
            <img
              src={song.albumArt}
              alt="Mudhal Nee Mudivum Nee Album Art"
              className="w-full h-full object-cover object-center rounded-full select-none"
              style={{ borderRadius: '50%', objectPosition: 'center center' }}
            />
          </motion.div>

          {/* Equalizer Visualizer */}
          {isPlaying && (
            <div className="absolute -bottom-2.5 flex items-end gap-1 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/40 shadow-lg z-10">
              <div className="w-1 bg-pink-400 rounded-full equalizer-bar" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 bg-purple-400 rounded-full equalizer-bar" style={{ animationDelay: '0.3s' }} />
              <div className="w-1 bg-rose-400 rounded-full equalizer-bar" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 bg-amber-400 rounded-full equalizer-bar" style={{ animationDelay: '0.4s' }} />
              <div className="w-1 bg-pink-400 rounded-full equalizer-bar" style={{ animationDelay: '0.15s' }} />
            </div>
          )}
        </div>

        {/* Track Title & Subtitle */}
        <div className="text-center w-full mb-5 flex flex-col items-center justify-center px-2">
          <h3 className="font-cute text-2xl sm:text-3xl text-pink-200 font-bold tracking-wide">
            {song.songTitle}
          </h3>
          <p className="text-xs sm:text-sm text-pink-300/80 mt-1 flex items-center justify-center gap-1.5 font-medium">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 inline" />
            <span>{song.subtitle || "Unakkaga indha song ❤️"}</span>
          </p>
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="w-full space-y-1.5 mb-5">
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
            aria-label="Song progress"
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-all"
          />
          <div className="flex justify-between text-xs text-white/40 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full px-4 mb-1">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.6)] cursor-pointer border border-pink-300/40 relative group"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-white" />
            ) : (
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            )}
          </motion.button>

          <div className="p-2.5 rounded-full bg-white/5 text-pink-400/70 flex items-center justify-center">
            <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
