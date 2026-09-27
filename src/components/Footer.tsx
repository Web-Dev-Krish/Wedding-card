import { Heart, Sparkles } from 'lucide-react';
import { EVENT } from '../lib/event';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-rose-800 text-cream/80 py-16 px-4 text-center">
      {/* Ambient background glow and texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,161,74,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 z-10">
        <p className="font-script text-4xl sm:text-5xl text-gold-300">
          Awaiting your presence
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 w-full max-w-xs">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400" />
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400" />
        </div>

        <p className="font-display text-3xl sm:text-4xl text-cream font-medium tracking-wide">
          {EVENT.hashtag}
        </p>

        <p className="max-w-md font-body text-base sm:text-lg text-cream/75">
          For any queries, please reach out to our family:
          <br />
          <a
            href={`https://wa.me/${EVENT.rsvpWhatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-300 font-semibold hover:underline inline-block mt-1 transition-colors"
          >
            {EVENT.rsvpContactName} · +91 9540214384
          </a>
        </p>

        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="flex items-center gap-1.5 font-body text-xs tracking-wider uppercase text-cream/60">
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
            Crafted with love
          </span>
        </div>

        <a
          href="https://devsiy.in"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-2 font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-gold-300/80 transition hover:text-gold-200"
        >
          <Sparkles className="h-4 w-4 text-gold-400" />
          Get your own premium digital invitation
        </a>
      </div>

      {/* Bottom Bar from Malhotra Events with Powered by Devsiy */}
      <div className="relative z-10 border-t border-gold-400/20 pt-8 mt-12 max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-cream/60">
          <p>© 2026 Malhotra Events. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://devsiy.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">
              Privacy Policy
            </a>
            <a href="https://devsiy.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">
              Admin Panel
            </a>
            <a href="https://devsiy.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center">
          <p className="text-xs sm:text-sm font-body text-cream/70 tracking-wide">
            Powered by{' '}
            <a
              href="https://devsiy.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
            >
              Devsiy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
