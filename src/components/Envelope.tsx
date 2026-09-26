import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { EVENT } from '../lib/event';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => onOpen(), 1300);
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.2 } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-800 via-rose-700 to-ink px-4"
      >
        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="relative flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="uppercase tracking-[0.4em] text-gold-300 text-xs md:text-sm mb-6 font-body"
          >
            You are cordially invited
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="relative w-[280px] h-[190px] sm:w-[360px] sm:h-[240px] cursor-pointer select-none"
            onClick={handleClick}
          >
            {/* Envelope back */}
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-blush-100 to-cream-dark shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-gold-400/40" />

            {/* Flap */}
            <motion.div
              animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
              className="absolute inset-x-0 top-0 h-full z-20"
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-rose-300 to-blush-200 border-b border-gold-400/40"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
            </motion.div>

            {/* Card peeking out */}
            <motion.div
              animate={opening ? { y: -70, opacity: 1 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: opening ? 0.3 : 0 }}
              className="absolute inset-x-4 top-3 bottom-3 sm:inset-x-6 rounded-sm bg-cream shadow-inner flex flex-col items-center justify-center z-10 border border-gold-300/50"
            >
              <span className="font-script text-2xl sm:text-3xl text-rose-600">
                {EVENT.brideName} &amp; {EVENT.groomName}
              </span>
              <span className="font-body text-[10px] sm:text-xs tracking-[0.3em] uppercase text-rose-400 mt-1">
                We're Engaged
              </span>
            </motion.div>

            {/* Seal */}
            {!opening && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg flex items-center justify-center border-2 border-gold-300/70"
              >
                <Heart className="w-6 h-6 text-cream fill-cream" strokeWidth={1} />
              </motion.div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-8 text-cream/80 font-body italic text-sm md:text-base tracking-wide"
          >
            tap the envelope to open
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
