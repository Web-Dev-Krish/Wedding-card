import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { EVENT } from '../lib/event';

const links = [
  { href: '#details', label: 'Details' },
  { href: '#story', label: 'Our Story' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#top" className={`flex items-center gap-2 font-script text-2xl ${scrolled ? 'text-rose-700' : 'text-cream'}`}>
          <Heart className="w-4 h-4" fill="currentColor" />
          {EVENT.groomName} &amp; {EVENT.brideName}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-sm uppercase tracking-widest hover:text-gold-500 transition-colors ${
                scrolled ? 'text-ink/80' : 'text-cream/90'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className={`md:hidden ${scrolled ? 'text-ink' : 'text-cream'}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream shadow-md flex flex-col px-5 py-4 gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm uppercase tracking-widest text-ink/80"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
