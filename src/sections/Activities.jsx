import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ActivityCard from "../components/ActivityCard";
import portfolioData from "../data/portfolio";

/* ─── animation variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function makeCardVariant(shouldReduceMotion) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.55, ease: "easeOut" },
    },
  };
}

export default function Activities() {
  const { activities } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const cardVariant = makeCardVariant(shouldReduceMotion);

  return (
    <section
      id="activities"
      className="py-32 lg:py-48 bg-secondary relative overflow-hidden"
      aria-label="Extracurricular activities"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, var(--color-glow) 0%, transparent 100%)",
        }}
      />

      <Container>
        <SectionTitle
          prefix="Extracurricular"
          accent="Activities"
          number="07"
        />

        {/* Staggered grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {activities.map((activity) => (
            <ActivityCard
              key={activity.title}
              activity={activity}
              variants={cardVariant}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
