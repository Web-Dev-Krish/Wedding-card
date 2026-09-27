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

  const getWhatsAppUrl = (data: FormState) => {
    const attendanceText = data.attendance === 'yes' ? 'Joyfully Yes' : 'Regretfully No';
    const messageLines = [
      `*Wedding RSVP - ${EVENT.groomName} & ${EVENT.brideName}*`,
      '',
      `*Name:* ${data.name.trim()}`,
      `*Email:* ${data.email.trim()}`,
      `*Attending:* ${attendanceText}`,
      ...(data.attendance === 'yes' ? [`*Number of Guests:* ${data.guests}`] : []),
      ...(data.message.trim() ? [`*Note/Wishes:* ${data.message.trim()}`] : []),
    ];
    return `https://wa.me/${EVENT.rsvpWhatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
  };

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

    const whatsappUrl = getWhatsAppUrl(form);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                <Send className="w-4 h-4" /> Send RSVP via WhatsApp
              </button>

              <p className="text-center text-xs text-ink/50 font-body -mt-2">
                Your RSVP will open WhatsApp to message {EVENT.rsvpContactName} directly.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="bg-cream/95 rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center text-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center shadow-md"
              >
                <Heart className="w-8 h-8 text-cream fill-cream" />
              </motion.div>
              <h3 className="font-display text-2xl text-rose-800">
                {form.attendance === 'yes' ? "Thank You, We Can't Wait!" : 'Thank You for Letting Us Know'}
              </h3>
              <p className="font-body text-ink/70">
                {form.attendance === 'yes'
                  ? `We've saved a seat for ${form.name.split(' ')[0] || 'you'}. See you on the ${EVENT.dateLabel}!`
                  : `We'll miss you, ${form.name.split(' ')[0] || 'friend'}, but appreciate you letting us know.`}
              </p>

              <div className="w-full pt-2 flex flex-col items-center gap-2">
                <a
                  href={getWhatsAppUrl(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-body tracking-wide hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg text-sm sm:text-base font-medium"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Send Details via WhatsApp
                </a>
                <p className="text-xs text-ink/50 font-body">
                  If WhatsApp didn't open automatically, click the button above to send to {EVENT.rsvpContactName}.
                </p>
              </div>

              <button
                onClick={() => {
                  setForm(initialState);
                  setSubmitted(false);
                }}
                className="mt-2 text-sm text-rose-500 underline font-body hover:text-rose-700"
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
