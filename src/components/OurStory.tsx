import { motion } from 'framer-motion';
import { Heart, Sparkles, Gem } from 'lucide-react';
import SectionHeading from './SectionHeading';
import rosesImg from '../assets/roses.jpg';

const milestones = [
  {
    icon: Sparkles,
    year: '2021',
    title: 'How We Met',
    text: 'A chance encounter at a friend\'s rooftop dinner turned into hours of conversation that neither of us wanted to end.',
  },
  {
    icon: Heart,
    year: '2023',
    title: 'Falling in Love',
    text: 'Weekend hikes, late-night diner pancakes, and a hundred inside jokes later, we knew we had found home in each other.',
  },
  {
    icon: Gem,
    year: '2026',
    title: 'The Proposal',
    text: 'Under a sky full of stars, Jayant got down on one knee — and Sakshi said yes before he finished the question.',
  },
];

export default function OurStory() {
  return (
    <section id="story" className="relative py-24 px-4 bg-blush-50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Our Journey" title="Our Story" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          >
            <img src={rosesImg} alt="Blush roses" className="w-full h-72 md:h-96 object-cover" />
            <div className="absolute inset-0 ring-1 ring-gold-400/30 rounded-2xl" />
          </motion.div>

          <div className="flex flex-col gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-rose-600 text-cream flex items-center justify-center shadow-md shrink-0">
                    <m.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  {i !== milestones.length - 1 && <span className="flex-1 w-px bg-gold-400/40 my-2" />}
                </div>
                <div className="pb-2">
                  <span className="font-display text-gold-600 text-sm tracking-widest">{m.year}</span>
                  <h3 className="font-display text-xl text-rose-800 mt-1 mb-2">{m.title}</h3>
                  <p className="font-body text-ink/70 leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
