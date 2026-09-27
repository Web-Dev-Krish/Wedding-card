import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Share2,
  Heart,
  CalendarHeart,
  ExternalLink,
  Check,
  Sparkles,
} from "lucide-react";
import { weddingData } from "../data/weddingData";
import Petals from "../components/Petals";
import CurtainOpening from "../components/CurtainOpening";
import FloralDivider from "../components/FloralDivider";
import Countdown from "../components/Countdown";
import SectionReveal from "../components/SectionReveal";
import EventCard from "../components/EventCard";
import Gallery from "../components/Gallery";
import RSVPForm from "../components/RSVPForm";
import Wordmark from "../components/Wordmark";

function CoupleCard({
  member,
  side,
}: {
  member: (typeof weddingData)["groom"];
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative">
        <div className="animate-glow rounded-full p-1.5">
          <div className="rounded-full ring-2 ring-gold/50">
            <img
              src={member.photo}
              alt={member.fullName}
              className="h-40 w-40 rounded-full object-cover object-center sm:h-48 sm:w-48"
            />
          </div>
        </div>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-ivory px-4 py-1 font-display text-[0.65rem] tracking-[0.3em] uppercase text-gold-dark shadow-sm">
          {member.role}
        </span>
      </div>
      <h3 className="mt-6 font-script text-5xl text-maroon sm:text-6xl">
        {member.name}
      </h3>
      <p className="mt-1 font-display text-sm tracking-[0.25em] uppercase text-maroon/60">
        {member.fullName}
      </p>
      <p className="mt-3 max-w-[15rem] font-serif text-base italic leading-snug text-maroon-dark/70">
        {member.parents}
      </p>
      {member.instagram && (
        <p className="mt-2 font-serif text-sm text-rose/70">{member.instagram}</p>
      )}
    </motion.div>
  );
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const { groom, bride } = weddingData;

  // Countdown starts at exactly 10d 7h 56m 35s from first page load
  const [countdownTargetISO] = useState(() => {
    const offset =
      10 * 86400000 + // 10 days
      7 * 3600000 +   // 7 hours
      56 * 60000 +    // 56 minutes
      35 * 1000;      // 35 seconds
    return new Date(Date.now() + offset).toISOString();
  });

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleShare = async () => {
    const shareData = {
      title: `${groom.name} & ${bride.name}'s Wedding Invitation`,
      text: `You're invited! ${weddingData.hashtag} · ${weddingData.weddingDateLong}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const gcalLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${groom.name} & ${bride.name}'s Wedding`)}&dates=20260214T123000Z/20260214T200000Z&details=${encodeURIComponent(`${weddingData.venue.name}, ${weddingData.venue.address}`)}&location=${encodeURIComponent(`${weddingData.venue.name}, New Delhi`)}`;

  return (
    <div className="relative min-h-screen bg-ivory">
      <CurtainOpening onOpen={() => setOpened(true)} />
      {opened && <Petals count={26} />}

      {/* Floating share button */}
      <motion.button
        onClick={handleShare}
        initial={{ opacity: 0, scale: 0 }}
        animate={opened ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/90 text-gold-light shadow-lg backdrop-blur transition hover:scale-110 hover:bg-maroon"
        aria-label="Share invitation"
      >
        {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
      </motion.button>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-maroon-deep px-4 py-12 sm:px-6 sm:py-16 md:py-20 text-center">
        <div className="absolute inset-0">
          <img
            src={weddingData.couplePhoto}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-maroon-deep/95 via-maroon-deep/80 to-maroon-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,161,74,0.22),transparent_65%)]" />
        </div>

        {/* Top Invocation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative z-10"
        >
          <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.35em] text-gold-pale uppercase drop-shadow-md">
            {weddingData.invocation}
          </span>
        </motion.div>

        {/* Main Center Content */}
        <div className="relative z-10 my-auto flex w-full max-w-3xl flex-col items-center px-2 py-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-display text-[0.7rem] sm:text-xs tracking-[0.45em] uppercase text-cream/80 drop-shadow-sm"
          >
            The Wedding of
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-1 font-script leading-tight"
          >
            <span className="text-5xl sm:text-7xl md:text-8xl text-gold-pale drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(230,199,122,0.4)]">
              {groom.name}
            </span>
            <span className="font-display text-sm sm:text-xl tracking-[0.35em] uppercase text-gold-light/80 font-normal self-center">
              weds
            </span>
            <span className="text-5xl sm:text-7xl md:text-8xl text-gold-pale drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(230,199,122,0.4)]">
              {bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-5 sm:mt-6 flex flex-col items-center gap-2 sm:gap-2.5"
          >
            <FloralDivider tone="dark" />
            <p className="font-display text-base sm:text-xl font-medium tracking-wide text-ivory drop-shadow-sm">
              {weddingData.weddingDateLong}
            </p>
            <p className="flex items-center justify-center gap-1.5 font-serif text-sm sm:text-base text-cream/80 drop-shadow-xs">
              <MapPin className="h-4 w-4 text-gold-light shrink-0" />
              <span>{weddingData.venue.name}, Kanpur, Uttar Pradesh</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-5 sm:mt-7 w-full flex justify-center"
          >
            <Countdown targetISO={weddingData.weddingDateISO} tone="dark" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-4 sm:mt-5 font-script text-2xl sm:text-3xl text-gold-light drop-shadow-sm"
          >
            {weddingData.hashtag}
          </motion.p>
        </div>

        {/* Bottom Scroll Hint */}
        <motion.a
          href="#invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative z-10 flex flex-col items-center gap-1 text-gold-light/70 transition hover:text-gold-light"
        >
          <span className="font-display text-[0.65rem] tracking-[0.3em] uppercase">
            Scroll to unfold
          </span>
          <ChevronDown className="h-4 w-4 animate-bob" />
        </motion.a>
      </section>

      {/* INVITATION / BLESSING */}
      <section
        id="invitation"
        className="relative overflow-hidden bg-cream py-20 sm:py-28"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-maroon-deep to-cream" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 text-center">
          <SectionReveal>
            <span className="font-serif text-sm tracking-[0.35em] text-gold-dark">
              {weddingData.invocation}
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FloralDivider label="The Invitation" />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="max-w-2xl font-serif text-2xl leading-relaxed text-maroon-dark/85 sm:text-3xl">
              {weddingData.blessing}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="mt-2">
              <p className="font-display text-sm tracking-[0.3em] uppercase text-maroon/55">
                Together with their families
              </p>
              <p className="mt-4 font-script text-6xl text-maroon sm:text-7xl">
                {groom.name}{" "}
                <span className="text-gold">&amp;</span> {bride.name}
              </p>
              <p className="mt-4 font-display tracking-[0.2em] text-maroon-dark/70">
                request the honour of your presence
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* THE COUPLE */}
      <section className="relative overflow-hidden bg-blush py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 opacity-[0.12]">
          <img src="/images/floral-corner.png" alt="" aria-hidden />
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-10 h-40 w-40 -scale-x-100 opacity-[0.12]">
          <img src="/images/floral-corner.png" alt="" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal className="flex flex-col items-center gap-7 text-center">
            <FloralDivider label="The Couple" />
            <h2 className="font-heading text-3xl font-semibold text-maroon sm:text-5xl">
              Meet the <span className="text-gold-shimmer">Happy Couple</span>
            </h2>
          </SectionReveal>

          <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
            <CoupleCard member={groom} side="left" />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 160 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-ivory shadow-md"
            >
              <Heart className="h-7 w-7 fill-rose text-rose" />
            </motion.div>
            <CoupleCard member={bride} side="right" />
          </div>
        </div>
      </section>

      {/* EVENTS / ITINERARY */}
      <section className="relative bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal className="flex flex-col items-center gap-7 text-center">
            <FloralDivider label="The Celebrations" />
            <h2 className="font-heading text-3xl font-semibold text-maroon sm:text-5xl">
              Wedding <span className="text-gold-shimmer">Itinerary</span>
            </h2>
            <p className="max-w-xl font-serif text-lg text-maroon-dark/70">
              Five beautiful moments woven into one celebration — we'd be
              honoured to have you at any, or all of them.
            </p>
          </SectionReveal>

          <div className="mt-12 flex flex-col gap-6">
            {weddingData.events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* COUNTDOWN TIMER */}
      <section className="relative overflow-hidden bg-blush py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 opacity-[0.12]">
          <img src="/images/floral-corner.png" alt="" aria-hidden />
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-10 h-40 w-40 -scale-x-100 opacity-[0.12]">
          <img src="/images/floral-corner.png" alt="" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal className="flex flex-col items-center gap-7 text-center">
            <FloralDivider label="Save the Date" />
            <h2 className="font-heading text-3xl font-semibold text-maroon sm:text-5xl">
              Counting <span className="text-gold-shimmer">Down</span>
            </h2>
            <p className="max-w-xl font-serif text-lg text-maroon-dark/70">
              Every second brings us closer to the most beautiful day of our
              lives — and we can't wait to celebrate it with you.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="mt-10">
              <Countdown targetISO={countdownTargetISO} tone="light" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <p className="mt-8 text-center font-display text-sm tracking-[0.25em] uppercase text-maroon/55">
              {weddingData.weddingDateLong} · {weddingData.weddingTime}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* GALLERY */}
      <Gallery />

      {/* VENUE */}
      <section className="relative bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal className="flex flex-col items-center gap-7 text-center">
            <FloralDivider label="The Venue" />
            <h2 className="font-heading text-3xl font-semibold text-maroon sm:text-5xl">
              Find Your <span className="text-gold-shimmer">Way</span>
            </h2>
          </SectionReveal>

          <div className="mt-12 grid items-stretch gap-8 md:grid-cols-2">
            <SectionReveal className="flex flex-col justify-center gap-5">
              <div>
                <h3 className="font-heading text-2xl text-maroon">
                  {weddingData.venue.name}
                </h3>
                <p className="font-serif text-lg italic text-rose/80">
                  {weddingData.venue.hall}
                </p>
                <p className="mt-2 flex items-start gap-2 font-serif text-maroon-dark/75">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-dark" />
                  {weddingData.venue.address}
                </p>
              </div>
              <div className="rounded-xl border border-gold/30 bg-ivory p-4">
                <p className="font-display text-xs tracking-[0.2em] uppercase text-maroon/55">
                  Baraat &amp; Pheras
                </p>
                <p className="font-serif text-lg text-maroon-dark">
                  {weddingData.weddingDateLong}
                </p>
                <p className="font-serif text-maroon-dark/70">
                  {weddingData.weddingTime}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={weddingData.venue.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-maroon to-rose px-6 py-3 font-display text-xs tracking-[0.2em] uppercase text-cream shadow-lg transition hover:scale-[1.03]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href={gcalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory px-6 py-3 font-display text-xs tracking-[0.2em] uppercase text-maroon transition hover:bg-gold/10"
                >
                  <CalendarHeart className="h-4 w-4" />
                  Add to Calendar
                </a>
              </div>
            </SectionReveal>

            <SectionReveal
              delay={0.15}
              className="overflow-hidden rounded-2xl border-2 border-gold/40 shadow-xl"
            >
              <iframe
                title="Venue location map"
                src={weddingData.venue.mapEmbed}
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="relative overflow-hidden bg-maroon py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,161,74,0.2),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 text-center">
          <SectionReveal className="flex flex-col items-center gap-5">
            <FloralDivider label="RSVP" tone="dark" />
            <h2 className="font-heading text-3xl font-semibold text-cream sm:text-5xl">
              Will You <span className="text-gold-shimmer">Join Us?</span>
            </h2>
            <p className="max-w-xl font-serif text-lg text-cream/70">
              Your presence is the greatest blessing we could ask for. Kindly
              let us know if you'll be celebrating with us.
            </p>
          </SectionReveal>

          <div className="mt-2 w-full">
            <RSVPForm />
          </div>

          <SectionReveal className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={weddingData.rsvp.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 px-5 py-2.5 font-display text-xs tracking-[0.2em] uppercase text-gold-light transition hover:bg-gold-light/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp {weddingData.rsvp.name.split(" ").slice(-1)}
            </a>
            <a
              href={`tel:${weddingData.rsvp.phoneLink}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 px-5 py-2.5 font-display text-xs tracking-[0.2em] uppercase text-gold-light transition hover:bg-gold-light/10"
            >
              <Phone className="h-4 w-4" />
              {weddingData.rsvp.phone}
            </a>
            <a
              href={`mailto:${weddingData.rsvp.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 px-5 py-2.5 font-display text-xs tracking-[0.2em] uppercase text-gold-light transition hover:bg-gold-light/10"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-maroon-deep py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,161,74,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6">
          <p className="font-script text-4xl text-gold-light sm:text-5xl">
            Awaiting your presence
          </p>
          <FloralDivider tone="dark" />
          <p className="font-heading text-3xl text-gold-shimmer sm:text-5xl">
            {weddingData.hashtag}
          </p>
          <p className="max-w-md font-serif text-lg text-cream/70">
            For any queries, please reach out to our family:
            <br />
            <span className="text-cream">{weddingData.rsvp.name}</span> ·{" "}
            {weddingData.rsvp.phone}
          </p>
          <div className="mt-4 flex flex-col items-center gap-2.5">
            <Link
              to="/"
              aria-label="E-निमंत्रण by Malhotra Events — home"
              className="transition hover:scale-[1.02]"
            >
              <Wordmark size="lg" tone="dark" />
            </Link>
            <span className="flex items-center gap-1.5 font-serif text-xs tracking-wide text-cream/55">
              <Heart className="h-3.5 w-3.5 fill-rose text-rose" />
              Crafted with love
            </span>
          </div>
          <Link
            to="/"
            className="mt-2 inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-gold-light/70 transition hover:text-gold-light"
          >
            <Sparkles className="h-4 w-4" />
            Get your own premium digital invitation
          </Link>
        </div>
      </footer>
    </div>
  );
}
