import { Heart } from 'lucide-react';
import { EVENT } from '../lib/event';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70 py-12 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="divider-line w-12" />
        <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
        <span className="divider-line w-12" />
      </div>
      <p className="font-script text-3xl text-gold-300 mb-2">
        {EVENT.brideName} &amp; {EVENT.groomName}
      </p>
      <p className="font-body text-sm tracking-widest uppercase">{EVENT.hashtag}</p>
      <p className="font-body text-xs mt-6 text-cream/40">
        Made with love — we can't wait to celebrate with you.
      </p>
    </footer>
  );
}
