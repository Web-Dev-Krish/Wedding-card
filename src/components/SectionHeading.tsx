import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center text-center mb-10"
    >
      {eyebrow && (
        <span
          className={`uppercase tracking-[0.35em] text-xs md:text-sm font-body mb-3 ${
            light ? 'text-gold-300' : 'text-rose-500'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-5xl ${
          light ? 'text-cream' : 'text-rose-800'
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 w-24 divider-line" />
    </motion.div>
  );
}
