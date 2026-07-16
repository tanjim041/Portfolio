import { memo } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { skillCategories } from "../data/skills";

/* ─── animation helpers ──────────────────────────────────────────── */
const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const pillItem = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ─── SkillPill ──────────────────────────────────────────────────── */
const SkillPill = memo(function SkillPill({ skill, isLearning }) {
  const { name, Icon, color } = skill;

  return (
    <motion.div
      variants={pillItem}
      role="listitem"
      aria-label={name}
      className="
        group relative flex items-center gap-2.5
        px-4 py-2.5 rounded-xl cursor-default select-none
        border border-border bg-card
        hover:border-accent-primary/40
        hover:bg-accent-primary/5
        hover:-translate-y-px
        hover:shadow-[0_0_18px_-4px_rgba(6,182,212,0.25)]
        transition-all duration-200
      "
    >
      {/* brand icon */}
      {Icon && (
        <Icon
          className="w-[17px] h-[17px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ color }}
          aria-hidden="true"
        />
      )}

      {/* skill name */}
      <span className="text-[13px] font-medium text-text-muted group-hover:text-text-main transition-colors duration-200 whitespace-nowrap leading-none">
        {name}
      </span>

      {/* pulse dot for "currently learning" */}
      {isLearning && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse flex-shrink-0"
          aria-label="Currently learning"
        />
      )}
    </motion.div>
  );
});

/* ─── SkillCategory ──────────────────────────────────────────────── */
const SkillCategory = memo(function SkillCategory({ category, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="
        grid grid-cols-1 lg:grid-cols-[260px_1fr]
        gap-6 lg:gap-20
        py-10 lg:py-14
        border-b border-border/30
        last:border-b-0
      "
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
    >
      {/* LEFT — category meta */}
      <div className="flex flex-col justify-start pt-0.5">
        {/* ordinal number */}
        <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-text-muted/30 uppercase mb-2">
          {num}
        </span>

        {/* category heading */}
        <h3 className="font-poppins text-base font-bold text-text-main uppercase tracking-wider leading-tight">
          {category.label}
        </h3>

        {/* description */}
        {category.description && (
          <p className="text-[12px] text-text-muted/50 mt-1.5 leading-relaxed font-normal">
            {category.description}
          </p>
        )}

        {/* "currently learning" badge */}
        {category.isLearning && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-accent-primary/70 border border-accent-primary/20 rounded-full px-2.5 py-1 self-start">
            <span className="w-1 h-1 rounded-full bg-accent-primary animate-pulse" />
            In Progress
          </span>
        )}
      </div>

      {/* RIGHT — skill pills */}
      <motion.div
        role="list"
        aria-label={`${category.label} skills`}
        className="flex flex-wrap gap-2.5 content-start"
        variants={pillContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {category.skills.map((skill) => (
          <SkillPill
            key={skill.name}
            skill={skill}
            isLearning={category.isLearning}
          />
        ))}
      </motion.div>
    </motion.div>
  );
});

/* ─── Skills (main section) ──────────────────────────────────────── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 lg:py-40 bg-secondary relative overflow-hidden"
      aria-label="Technical skills"
    >
      {/* ── subtle ambient glows ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(6,182,212,0.05) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 10% 100%, rgba(6,182,212,0.04) 0%, transparent 100%)",
        }}
      />

      <Container maxWidth="max-w-6xl">

        {/* ── section header ── */}
        <motion.header
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* eyebrow label */}
          <p className="flex items-center gap-3 text-accent-primary text-[11px] font-bold tracking-[0.4em] uppercase mb-6">
            <span className="block w-8 h-px bg-accent-primary" aria-hidden="true" />
            What I work with
          </p>

          {/* giant heading */}
          <h2
            className="font-poppins font-black text-text-main leading-[0.88]"
            style={{ fontSize: "clamp(52px, 9vw, 92px)" }}
          >
            Tech{" "}
            <span className="text-accent-primary">Stack</span>
          </h2>

          {/* description */}
          <p className="text-text-muted/70 mt-6 text-base max-w-md leading-relaxed">
            Languages, frameworks, databases and tools I use to design
            and ship things.
          </p>
        </motion.header>

        {/* ── category rows ── */}
        <div>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
