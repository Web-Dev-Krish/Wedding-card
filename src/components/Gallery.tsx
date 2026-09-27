import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Petals from './Petals';

import g2 from '../assets/GalleryImages (2).jpeg';
import g3 from '../assets/GalleryImages (3).jpeg';
import g4 from '../assets/GalleryImages (4).jpeg';
import g5 from '../assets/GalleryImages (5).jpeg';
import g6 from '../assets/GalleryImages (6).jpeg';
import g7 from '../assets/GalleryImages (7).jpeg';
import g8 from '../assets/GalleryImages (8).jpeg';
import g9 from '../assets/GalleryImages (9).jpeg';

const images = [

  { src: g2, alt: 'Jayant and Sakshi', span: '', position: 'object-[65%_32%]' },
  { src: g3, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g4, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g5, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g6, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g7, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g8, alt: 'Jayant and Sakshi', span: '', position: 'object-top' },
  { src: g9, alt: 'Jayant and Sakshi', span: 'col-span-2 md:col-span-2', position: 'object-center' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 px-4 bg-cream overflow-hidden">
      <Petals count={14} tone="light" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading eyebrow="Moments We Treasure" title="Our Gallery" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          {images.map((img, i) => (
            <motion.div
              key={i}
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
                className={`w-full ${i === 0 ? 'h-72 sm:h-80' : 'h-56'} md:h-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.position || 'object-center'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
