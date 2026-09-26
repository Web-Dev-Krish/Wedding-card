import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import c1 from '../assets/couple-1.jpg';
import c2 from '../assets/couple-2.jpg';
import c3 from '../assets/couple-3.jpg';

const images = [
  { src: c1, alt: 'Ava and Ethan laughing together', span: 'md:row-span-2' },
  { src: c2, alt: 'Ava and Ethan walking on the beach', span: '' },
  { src: c3, alt: 'Close up of engagement ring', span: '' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Moments We Treasure" title="Our Gallery" />

        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative overflow-hidden rounded-xl shadow-md group ${img.span} ${
                i === 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
