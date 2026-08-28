import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import TimelineItem from "../components/TimelineItem";
import portfolioData from "../data/portfolio";

export default function Education() {
  const { education } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="py-32 lg:py-48 bg-secondary relative overflow-hidden"
      aria-label="Education"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 10% 50%, var(--color-glow) 0%, transparent 100%)",
        }}
      />

      <Container maxWidth="max-w-4xl">
        <SectionTitle prefix="My" accent="Education" number="03" />

        {/* Timeline container — same left-rail pattern as Experience */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-[7px] sm:left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-primary/60 to-transparent origin-top"
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
            aria-hidden="true"
          />

          {/* Education entries */}
          <div className="space-y-10">
            {education.map((edu, index) => (
              <TimelineItem
                key={edu.institution}
                item={edu}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
