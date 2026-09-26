import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        rotate: Math.random() * 360,
        drift: Math.random() * 80 - 40,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: p.rotate }}
          animate={{
            y: '110vh',
            x: [0, p.drift, -p.drift, 0],
            opacity: [0, 1, 1, 0],
            rotate: p.rotate + 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: `${p.left}%`, width: p.size, height: p.size, position: 'absolute', top: 0 }}
          className="rounded-full bg-gradient-to-br from-rose-300 to-blush-200 opacity-70"
        />
      ))}
    </div>
  );
}
