import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import SkillCard from "../components/SkillCard";
import portfolioData from "../data/portfolio";

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-24 bg-secondary" aria-label="Technical skills">
      <Container>
        <SectionTitle
          prefix="Technical"
          accent="Skills"
          description="Technologies and core competencies I have acquired throughout my academic journey and personal projects."
        />

        {/* Hard Skills */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-poppins font-semibold mb-8 text-center text-text-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Hard Skills
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.hard.map((skill, index) => (
              <SkillCard key={skill} name={skill} variant="hard" index={index} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <motion.h3
            className="text-2xl font-poppins font-semibold mb-8 text-center text-text-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Soft Skills
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.soft.map((skill, index) => (
              <SkillCard key={skill} name={skill} variant="soft" index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
