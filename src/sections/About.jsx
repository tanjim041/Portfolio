import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Mail, Heart } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";
import portfolioData from "../data/portfolio";

/* ─── InfoCard stagger container ─────────────────────────────────── */
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/* ─── key stats for pull-quote block ─────────────────────────────── */
const keyStats = [
  { label: "Current CGPA", value: "3.3+" },
  { label: "HSC / SSC GPA", value: "5.00" },
  { label: "Year", value: "2nd" },
  { label: "Nationality", value: "BD" },
];

const infoCards = (personal) => [
  {
    icon: GraduationCap,
    label: "University",
    value: `${personal.university} (${personal.department})`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
  },
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Heart,
    label: "Interests",
    value: personal.interests,
  },
];

export default function About() {
  const { personal } = portfolioData;
  const cards = infoCards(personal);
  const shouldReduceMotion = useReducedMotion();

  // Ref for the profile image container — used to reveal color on scroll
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" });

  const itemVariants = shouldReduceMotion ? cardItemReduced : cardItem;

  return (
    <section
      id="about"
      className="py-32 lg:py-48 bg-secondary relative overflow-hidden"
      aria-label="About me"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 45% at 5% 50%, var(--color-glow) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 35% at 95% 10%, var(--color-glow) 0%, transparent 100%)",
        }}
      />

      <Container>
        <SectionTitle prefix="About" accent="Me" number="01" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ── Left: Profile Image ── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.4 : 0.7, ease: "easeOut" }}
          >
            {/* ref here so useInView tracks when this image block enters viewport */}
            <div className="relative group" ref={imageRef}>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded blur opacity-15 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded overflow-hidden aspect-square border border-border bg-card">
                <img
                  src="/images/profile.jpg"
                  alt={`${personal.name} profile`}
                  className={[
                    "w-full h-full object-cover filter transition-all",
                    // Reveal color when in view (700ms); hover is still layered on top via CSS
                    shouldReduceMotion || imageInView
                      ? "grayscale-0 duration-700"
                      : "grayscale duration-700",
                    // Keep hover colour override working independently
                    "group-hover:grayscale-0",
                  ].join(" ")}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=Tanjimul+Islam&size=512&background=1E1E22&color=FF7E47`;
                  }}
                />
              </div>
            </div>

            {/* Monospace key-stats pull block — editorial callout */}
            <motion.div
              className="mt-6 bg-card border border-border rounded p-5 font-mono"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.55, delay: shouldReduceMotion ? 0 : 0.25 }}
            >
              <p className="text-[10px] tracking-widest uppercase text-text-muted/40 mb-3">
                // at a glance
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {keyStats.map((s) => (
                  <div key={s.label}>
                    <span className="block text-[9px] tracking-widest uppercase text-text-muted/40 mb-0.5">
                      {s.label}
                    </span>
                    <span className="text-accent-primary text-sm font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Bio + Info Cards ── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.4 : 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-6 text-text-main">
              {personal.subtitle}
            </h3>

            <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
              {personal.about}
            </p>

            {/* Quick Info Cards — staggered */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {cards.map((card) => (
                <motion.div key={card.label} variants={itemVariants}>
                  <InfoCard
                    icon={card.icon}
                    label={card.label}
                    value={card.value}
                    href={card.href}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
