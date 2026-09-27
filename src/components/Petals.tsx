import { useMemo } from 'react';

interface PetalsProps {
  count?: number;
  tone?: 'dark' | 'light';
}

export default function Petals({ count = 16, tone = 'dark' }: PetalsProps) {
  const petals = useMemo(() => {
    const darkColors = [
      'text-rose-300/50',
      'text-rose-400/40',
      'text-blush-200/55',
      'text-gold-300/50',
      'text-gold-400/45',
    ];
    const lightColors = [
      'text-rose-400/45',
      'text-rose-500/35',
      'text-blush-300/55',
      'text-gold-500/40',
      'text-rose-300/50',
    ];
    const colors = tone === 'light' ? lightColors : darkColors;

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 94 + 3,
      delay: -(Math.random() * 14), // Negative delay so hearts are already falling across the screen on load
      duration: 9 + Math.random() * 8, // 9s to 17s fall time
      size: 14 + Math.random() * 16, // 14px to 30px
      rotStart: Math.floor(Math.random() * 60 - 30),
      rotEnd: Math.floor(Math.random() * 360 + 180),
      drift: Math.floor(Math.random() * 60 - 30),
      color: colors[i % colors.length],
      isHeart: i % 3 !== 2,
    }));
  }, [count, tone]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            position: 'absolute',
            animation: `heartFall ${p.duration}s linear ${p.delay}s infinite`,
            ['--drift' as string]: `${p.drift}px`,
            ['--rot-start' as string]: `${p.rotStart}deg`,
            ['--rot-end' as string]: `${p.rotEnd}deg`,
          }}
          className={`flex items-center justify-center ${p.color}`}
        >
          {p.isHeart ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-xs">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <span className="w-full h-full rounded-full bg-current opacity-70" />
          )}
        </div>
      ))}
    </div>
  );
}
