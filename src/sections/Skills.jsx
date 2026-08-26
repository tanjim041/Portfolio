import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { skillCategories } from "../data/skills";

const radialMetrics = [
  { label: "Problem Solving", percent: 95, detail: "C++ / CF specialist", value: "95%" },
  { label: "Data Structures", percent: 92, detail: "DSA Competency", value: "92%" },
  { label: "Full-Stack Dev", percent: 85, detail: "React / Node / Dart", value: "85%" },
  { label: "OOP & Design", percent: 88, detail: "System abstractions", value: "88%" },
];

const RadialMetric = memo(function RadialMetric({ metric }) {
  const { label, percent, detail, value } = metric;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.div
      className="bg-card border border-border rounded p-6 flex flex-col items-center justify-center text-center hover:border-accent-primary/50 hover-glow transition-all duration-300 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        {/* Background track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--color-border)"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Animated accent circle */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--color-accent-primary)"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: prefersReducedMotion ? circumference - (percent / 100) * circumference : circumference }}
            whileInView={{ strokeDashoffset: circumference - (percent / 100) * circumference }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeOut", delay: 0.15 }}
          />
        </svg>
        <span className="absolute font-mono text-xs font-bold text-text-main">
          {value}
        </span>
      </div>
      <h4 className="font-poppins text-xs font-bold text-text-main uppercase tracking-wider mb-1">
        {label}
      </h4>
      <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest">
        {detail}
      </p>
    </motion.div>
  );
});

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
        px-4 py-2.5 rounded cursor-default select-none
        border border-border bg-card
        hover:border-accent-primary/50
        hover:bg-accent-primary/5
        hover:-translate-y-px
        hover:shadow-[0_0_18px_-4px_var(--color-glow)]
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
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent-primary border border-accent-primary/20 rounded px-2.5 py-1 self-start">
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
            "radial-gradient(ellipse 60% 50% at 80% 0%, var(--color-glow) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 10% 100%, var(--color-glow) 0%, transparent 100%)",
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
          <p className="flex items-center gap-3 text-accent-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="block w-6 h-px bg-accent-primary" aria-hidden="true" />
            04 / Tech Stack
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

        {/* ── radial progress metrics ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 lg:mb-32">
          {radialMetrics.map((metric) => (
            <RadialMetric key={metric.label} metric={metric} />
          ))}
        </div>

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
