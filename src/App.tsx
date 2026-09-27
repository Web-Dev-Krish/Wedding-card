import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './components/Envelope';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [opened, setOpened] = useState(false);
  const [openingStarted, setOpeningStarted] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-cream overflow-x-hidden">
      <MusicPlayer autoPlayTrigger={openingStarted || opened} />

      <AnimatePresence>
        {!opened && (
          <Envelope
            onOpen={() => setOpened(true)}
            onStartOpen={() => setOpeningStarted(true)}
          />
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <Hero />
          <OurStory />
          <Gallery />
          <Details />
          <RSVP />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
