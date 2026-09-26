import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EVENT } from '../lib/event';

function getTimeLeft() {
  const diff = EVENT.date.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    done: diff <= 0,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="flex flex-col items-center justify-center w-[68px] h-[78px] sm:w-24 sm:h-28 rounded-lg bg-white/10 backdrop-blur-sm border border-gold-300/40 shadow-lg"
        >
          <span className="font-display text-2xl sm:text-4xl text-gold-300 tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream/70 mt-1">
            {u.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
