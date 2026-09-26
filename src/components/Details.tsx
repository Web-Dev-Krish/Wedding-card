import { motion } from 'framer-motion';
import { CalendarHeart, Clock, MapPin, Shirt, Download, Navigation } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { EVENT } from '../lib/event';
import { downloadInvite } from '../lib/ics';

const cards = [
  {
    icon: CalendarHeart,
    title: 'The Date',
    lines: [EVENT.dateLabel, EVENT.yearLabel],
  },
  {
    icon: Clock,
    title: 'The Time',
    lines: [EVENT.time, 'Reception & dinner to follow'],
  },
  {
    icon: MapPin,
    title: 'The Venue',
    lines: [EVENT.venueName, EVENT.venueAddress],
  },
  {
    icon: Shirt,
    title: 'Dress Code',
    lines: ['Garden Formal', 'Blush, gold & earth tones welcomed'],
  },
];

export default function Details() {
  return (
    <section id="details" className="relative bg-cream py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Save the Date" title="Celebration Details" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white/70 border border-gold-300/40 rounded-xl px-6 py-8 text-center shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-rose-600" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-lg text-rose-800 mb-2">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="font-body text-sm text-ink/70 leading-snug">
                  {l}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={downloadInvite}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-cream font-body tracking-wide hover:bg-rose-700 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" /> Add to Calendar
          </button>
          <a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500 text-gold-600 font-body tracking-wide hover:bg-gold-500 hover:text-cream transition-colors"
          >
            <Navigation className="w-4 h-4" /> Get Directions
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 font-body italic text-rose-500 text-sm"
        >
          kindly reply by {EVENT.rsvpDeadline}
        </motion.p>
      </div>
    </section>
  );
}
