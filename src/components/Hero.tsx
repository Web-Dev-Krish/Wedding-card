import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Countdown from './Countdown';
import Petals from './Petals';
import { EVENT } from '../lib/event';
import heroImg from '../assets/hero-rings.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden text-center px-4 pt-24 pb-16">
      <img
        src={heroImg}
        alt="Engagement ring among rose petals"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-rose-800/60 to-ink/85" />
      <Petals count={16} />

      <motion.p
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 uppercase tracking-[0.5em] text-gold-300 text-xs sm:text-sm font-body mb-6"
      >
        Together with their families
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 font-script text-6xl sm:text-8xl text-cream text-shadow-soft leading-tight"
      >
        {EVENT.brideName} <span className="text-gold-300">&amp;</span> {EVENT.groomName}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 font-body text-cream/90 mt-6 text-lg sm:text-xl italic max-w-xl"
      >
        request the pleasure of your company as they celebrate their engagement
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 flex items-center gap-3 mt-8 text-cream"
      >
        <span className="divider-line w-10 sm:w-16" />
        <span className="font-display text-base sm:text-xl tracking-wide">
          {EVENT.dateLabel}, {EVENT.yearLabel}
        </span>
        <span className="divider-line w-10 sm:w-16" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-10 w-full"
      >
        <Countdown />
      </motion.div>

      <motion.a
        href="#details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.8 }, y: { repeat: Infinity, duration: 2 } }}
        className="relative z-10 mt-12 text-gold-300"
        aria-label="Scroll for details"
      >
        <ChevronDown className="w-8 h-8" strokeWidth={1.2} />
      </motion.a>
    </section>
  );
}
