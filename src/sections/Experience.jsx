import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import portfolioData from "../data/portfolio";

export default function Experience() {
  const { experience } = portfolioData;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 relative" aria-label="Experience">
      <Container maxWidth="max-w-4xl">
        <SectionTitle prefix="Work" accent="Experience" />

        <div className="space-y-12">
          {experience.map((exp, index) => {
            const isAvailable = exp.duration?.toLowerCase() === "available";
            return (
              <motion.div
                key={exp.role + exp.company}
                className="bg-card rounded-2xl border border-border p-8 hover:border-accent-primary/30 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Background glowing gradient circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl group-hover:bg-accent-primary/10 transition-colors duration-500 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-poppins font-bold text-text-main group-hover:text-accent-primary transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-text-muted font-medium mt-1">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent-primary/15 text-accent-primary border border-accent-primary/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-4 py-1.5 bg-secondary text-accent-secondary border border-border rounded-full text-xs font-semibold tracking-wider uppercase">
                        {exp.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description bullets */}
                <ul className="mt-6 space-y-3 pl-5 list-disc text-text-muted text-sm leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="hover:text-text-main transition-colors duration-200">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA note for internship card */}
                {isAvailable && (
                  <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/20">
                    <Sparkles className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                    <p className="text-accent-primary text-sm leading-relaxed">
                      Actively looking for internship opportunities. Feel free to contact me for collaboration or internship positions.
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

