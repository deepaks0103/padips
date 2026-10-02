import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';

export const SpecialNoteSection: React.FC = () => {
  const { specialNote } = BIRTHDAY_DATA;

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md"
      >
        <MessageCircleHeart className="w-4 h-4 text-purple-400" />
        <span>{specialNote.badge}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cute text-3xl sm:text-5xl font-bold text-center mb-8"
      >
        <span className="text-gradient-romantic">{specialNote.title}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card-glow max-w-lg w-full rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-2xl text-left"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed relative z-10">
          {specialNote.paragraphs.map((p: string, idx: number) => (
            <p
              key={idx}
              className={`whitespace-pre-line ${
                idx === 2
                  ? 'text-pink-200 font-medium pl-3 border-l-2 border-pink-400'
                  : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-pink-300/80">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>{specialNote.signOff}</span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
      </motion.div>
    </section>
  );
};
