import { memo } from "react";
import { motion } from "framer-motion";

const SectionTitle = memo(function SectionTitle({
  prefix,
  accent,
  description,
  number,
  accentColor = "text-accent-primary",
  align = "left",
}) {
  const isLeft = align === "left";

  return (
    <motion.div
      className={`mb-20 lg:mb-28 ${isLeft ? "text-left" : "text-center"}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {number && (
        <div className={`font-mono text-xs uppercase tracking-widest text-accent-primary mb-4 flex items-center gap-2 ${isLeft ? "" : "justify-center"}`}>
          {isLeft && <span className="w-6 h-[1px] bg-accent-primary" />}
          <span>{number} / {prefix}</span>
        </div>
      )}
      <h2 className="font-poppins text-4xl md:text-6xl font-black text-text-main tracking-tight uppercase leading-[0.95]">
        {!number && `${prefix} `}<span className={accentColor}>{accent}</span>
      </h2>
      {description && (
        <p className={`text-text-muted mt-4 text-base max-w-2xl leading-relaxed ${isLeft ? "text-left" : "mx-auto"}`}>{description}</p>
      )}
    </motion.div>
  );
});

export default SectionTitle;
