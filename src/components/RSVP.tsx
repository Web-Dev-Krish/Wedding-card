import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Users, Mail, MessageCircleHeart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { EVENT } from '../lib/event';

type Attendance = 'yes' | 'no' | '';

interface FormState {
  name: string;
  email: string;
  guests: string;
  attendance: Attendance;
  message: string;
}

const initialState: FormState = { name: '', email: '', guests: '1', attendance: '', message: '' };

export default function RSVP() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.attendance) {
      setError('Please fill in your name, email, and let us know if you can make it.');
      return;
    }
    setError('');
    try {
      const existing = JSON.parse(localStorage.getItem('rsvps') || '[]');
      existing.push({ ...form, ts: Date.now() });
      localStorage.setItem('rsvps', JSON.stringify(existing));
    } catch {
      /* ignore storage errors */
    }
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-rose-800 overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-40" />
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-blush-200/10 blur-3xl" />

      <div className="relative max-w-xl mx-auto">
        <SectionHeading eyebrow="Kindly Respond" title="RSVP" light />
        <p className="text-center font-body text-cream/80 -mt-6 mb-10">
          We would be delighted to have you join us. Please respond by{' '}
          <span className="text-gold-300">{EVENT.rsvpDeadline}</span>.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="bg-cream/95 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-rose-600 font-body">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="border-b border-gold-400/50 bg-transparent py-2 font-body text-ink focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-rose-600 font-body flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="border-b border-gold-400/50 bg-transparent py-2 font-body text-ink focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-rose-600 font-body flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="border-b border-gold-400/50 bg-transparent py-2 font-body text-ink focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-rose-600 font-body">Attending?</label>
                  <div className="flex gap-2 pt-1">
                    {(['yes', 'no'] as Attendance[]).map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setForm({ ...form, attendance: val })}
                        className={`flex-1 rounded-full py-2 text-sm font-body border transition-colors ${
                          form.attendance === val
                            ? 'bg-rose-600 text-cream border-rose-600'
                            : 'border-gold-400/50 text-ink/70 hover:border-rose-400'
                        }`}
                      >
                        {val === 'yes' ? 'Joyfully Yes' : 'Regretfully No'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-rose-600 font-body flex items-center gap-1.5">
                  <MessageCircleHeart className="w-3.5 h-3.5" /> A Note for the Couple (optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Share your wishes..."
                  className="border border-gold-400/40 rounded-lg bg-transparent p-3 font-body text-ink focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>

              {error && <p className="text-rose-600 text-sm font-body">{error}</p>}

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-rose-600 text-cream font-body tracking-widest uppercase text-sm hover:bg-rose-700 transition-colors shadow-md"
              >
                <Send className="w-4 h-4" /> Send RSVP
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="bg-cream/95 rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-cream fill-cream" />
              </motion.div>
              <h3 className="font-display text-2xl text-rose-800">
                {form.attendance === 'yes' ? 'Thank You, We Can\'t Wait!' : 'Thank You for Letting Us Know'}
              </h3>
              <p className="font-body text-ink/70">
                {form.attendance === 'yes'
                  ? `We've saved a seat for ${form.name.split(' ')[0] || 'you'}. See you on the ${EVENT.dateLabel}!`
                  : `We'll miss you, ${form.name.split(' ')[0] || 'friend'}, but appreciate you letting us know.`}
              </p>
              <button
                onClick={() => {
                  setForm(initialState);
                  setSubmitted(false);
                }}
                className="mt-2 text-sm text-rose-500 underline font-body"
              >
                Submit another response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
