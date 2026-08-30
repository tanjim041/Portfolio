import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TimelineItem — single-column left-rail layout.
 *
 * Visual structure:
 *   [dot on line] — [card slides in from right]
 *
 * Works for both Education and Experience timeline sections.
 */
const TimelineItem = memo(function TimelineItem({ item, index }) {
  const shouldReduceMotion = useReducedMotion();

  // Dot appears slightly after the line reaches it:
  // line draws in over ~1.2s; each card staggers at index * 0.12s.
  // Dot delay mirrors the card delay + a small lead (0.15s) so it
  // pops just before the card slides in — spatial consistency.
  const dotDelay = shouldReduceMotion ? 0 : index * 0.12 + 0.15;

  return (
    <motion.div
      className="relative pl-10 sm:pl-14"
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: "easeOut",
      }}
    >
      {/* Timeline dot — pops in as the vertical line "reaches" it */}
      <motion.div
        className="
          absolute left-0 top-6
          w-4 h-4 rounded-full
          bg-background border-2 border-accent-primary
          ring-4 ring-accent-primary/10
          flex-shrink-0
          z-10
        "
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.2,
          delay: dotDelay,
          ease: "easeOut",
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="bg-card rounded border border-border px-6 py-6 hover:border-accent-primary/50 hover-glow transition-all duration-300 group">
        {/* Header row: image banner */}
        {item.image && (
          <div className="h-28 -mx-6 -mt-6 mb-5 rounded-t overflow-hidden relative">
            <div className="absolute inset-0 bg-secondary/40 group-hover:bg-transparent transition-colors z-10" />
            <img
              src={item.image}
              alt={item.institution ?? item.company}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=300&fit=crop";
              }}
            />
          </div>
        )}

        {/* Meta row */}
        <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
          <span className="text-accent-primary font-mono text-[10px] font-bold tracking-wider uppercase">
            {item.duration}
          </span>
          {item.score && (
            <span className="bg-secondary px-2.5 py-1 rounded font-mono text-[10px] text-text-main border border-border">
              {item.score}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-poppins font-bold text-lg text-text-main mb-1 group-hover:text-accent-primary transition-colors duration-300">
          {item.degree ?? item.role}
        </h3>

        {/* Subtitle */}
        <h4 className="text-text-muted font-mono text-xs mb-4 tracking-wide">
          {item.institution ?? item.company}
        </h4>

        {/* Description — string or array of bullets */}
        {Array.isArray(item.description) ? (
          <ul className="space-y-2 pl-4 list-disc text-text-muted text-sm leading-relaxed">
            {item.description.map((bullet, i) => (
              <li key={i} className="hover:text-text-main transition-colors duration-200">
                {bullet}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
        )}
      </div>
    </motion.div>
  );
});

export default TimelineItem;
