import { memo } from "react";
import { motion } from "framer-motion";

const SectionTitle = memo(function SectionTitle({
  prefix,
  accent,
  description,
  accentColor = "text-accent-primary",
  lineColor = "from-accent-primary",
}) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-poppins text-3xl md:text-5xl font-bold text-text-main mb-4">
        {prefix} <span className={accentColor}>{accent}</span>
      </h2>
      <div
        className={`w-24 h-1 bg-gradient-to-r ${lineColor} to-transparent mx-auto rounded-full ${description ? "mb-6" : ""}`}
      />
      {description && (
        <p className="text-text-muted max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  );
});

export default SectionTitle;
