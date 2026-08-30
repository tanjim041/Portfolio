import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import TimelineItem from "../components/TimelineItem";
import portfolioData from "../data/portfolio";

export default function Experience() {
  const { experience } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  if (!experience || experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="py-32 lg:py-48 relative overflow-hidden"
      aria-label="Experience"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 90% 50%, var(--color-glow) 0%, transparent 100%)",
        }}
      />

      <Container maxWidth="max-w-4xl">
        <SectionTitle prefix="Work" accent="Experience" number="02" />

        {/* Timeline container */}
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

          {/* Entry list */}
          <div className="space-y-10">
            {experience.map((exp, index) => {
              const isAvailable = exp.duration?.toLowerCase() === "available";

              return (
                <div key={exp.role + exp.company} className="relative pl-10 sm:pl-14">
                  {/* Timeline dot — pops in as the vertical line "reaches" it */}
                  <motion.div
                    className="absolute left-0 top-6 w-4 h-4 rounded-full bg-background border-2 border-accent-primary ring-4 ring-accent-primary/10 z-10"
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.3 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      delay: shouldReduceMotion ? 0 : index * 0.12 + 0.15,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                  />

                  {/* Card */}
                  <motion.div
                    className="bg-card rounded border border-border p-8 hover:border-accent-primary/50 hover-glow transition-all duration-300 relative overflow-hidden group"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: shouldReduceMotion ? 0.3 : 0.55,
                      delay: shouldReduceMotion ? 0 : index * 0.12,
                      ease: "easeOut",
                    }}
                  >
                    {/* Background accent blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl group-hover:bg-accent-primary/10 transition-colors duration-500 pointer-events-none" />

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-text-main group-hover:text-accent-primary transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-text-muted font-mono text-xs tracking-wide mt-1">
                          {exp.company}
                        </p>
                      </div>

                      {/* Date badge */}
                      <div className="flex-shrink-0">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-primary/15 text-accent-primary border border-accent-primary/30 rounded font-mono text-[10px] font-bold tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1.5 bg-secondary text-accent-primary border border-border rounded font-mono text-[10px] font-bold tracking-wider uppercase">
                            {exp.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description bullets */}
                    <ul className="space-y-3 pl-4 list-disc text-text-muted text-sm leading-relaxed">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="hover:text-text-main transition-colors duration-200">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* CTA note for internship card */}
                    {isAvailable && (
                      <div className="mt-6 flex items-start gap-3 p-4 rounded bg-accent-primary/5 border border-accent-primary/20">
                        <Sparkles className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                        <p className="text-accent-primary font-mono text-xs leading-relaxed">
                          Actively looking for internship opportunities. Feel free to contact me for
                          collaboration or internship positions.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
