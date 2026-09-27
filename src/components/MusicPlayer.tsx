import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume as requested
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Play music when triggered (e.g. envelope opened)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Fallback for strict browser autoplay policies
        const resumeOnGesture = () => {
          if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play().catch(() => {});
          }
          window.removeEventListener('click', resumeOnGesture);
          window.removeEventListener('touchstart', resumeOnGesture);
        };
        window.addEventListener('click', resumeOnGesture, { once: true });
        window.addEventListener('touchstart', resumeOnGesture, { once: true });
      });
    }
  }, [autoPlayTrigger]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  };

  if (!autoPlayTrigger) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={toggleMusic}
        className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-ink/90 hover:bg-ink text-gold-300 border border-gold-400/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Mute background music' : 'Play background music'}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-cream/50" />
          )}
        </div>

        {/* Mini soundbar visualizer */}
        <div className="flex items-end gap-0.5 h-3">
          <span
            className={`w-0.5 rounded-full bg-gold-400 transition-all ${
              isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite] h-3' : 'h-1 bg-cream/30'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-gold-400 transition-all ${
              isPlaying ? 'animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3.5' : 'h-1.5 bg-cream/30'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-gold-400 transition-all ${
              isPlaying ? 'animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5' : 'h-1 bg-cream/30'
            }`}
          />
        </div>

        <span className="font-body text-xs tracking-wider uppercase pr-1 text-cream/90 font-medium">
          {isPlaying ? 'Music' : 'Paused'}
        </span>
      </button>
    </div>
  );
}
