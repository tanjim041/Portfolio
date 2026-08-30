import { memo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const SectionTitle = memo(function SectionTitle({
  prefix,
  accent,
  description,
  number,
  accentColor = "text-accent-primary",
  align = "left",
}) {
  const isLeft = align === "left";
  const shouldReduceMotion = useReducedMotion();

  // Number counter: briefly shows "00" then flips to the real value
  // once the section title enters the viewport (~75ms after entry).
  // The ref is placed on the eyebrow row so IntersectionObserver fires
  // at the same time as the parent motion.div fade-in.
  const eyebrowRef = useRef(null);
  const eyebrowInView = useInView(eyebrowRef, { once: true, margin: "-40px" });
  const [displayNumber, setDisplayNumber] = useState(
    shouldReduceMotion ? number : "00"
  );

  useEffect(() => {
    if (!number || shouldReduceMotion) return;
    if (eyebrowInView) {
      // Short delay so the "00" frame is briefly visible before flipping
      const timer = setTimeout(() => setDisplayNumber(number), 75);
      return () => clearTimeout(timer);
    }
  }, [eyebrowInView, number, shouldReduceMotion]);

  return (
    <motion.div
      className={`mb-20 lg:mb-28 ${isLeft ? "text-left" : "text-center"}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {number && (
        <div
          ref={eyebrowRef}
          className={`font-mono text-xs uppercase tracking-widest text-accent-primary mb-4 flex items-center gap-2 ${isLeft ? "" : "justify-center"}`}
        >
          {isLeft && <span className="w-6 h-[1px] bg-accent-primary" />}
          {/* displayNumber flips from "00" → real value 75ms after entry */}
          <span>{displayNumber} / {prefix}</span>
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
