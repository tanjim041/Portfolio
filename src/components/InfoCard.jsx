import { memo } from "react";
import { motion } from "framer-motion";

const InfoCard = memo(function InfoCard({ icon: Icon, label, value, href }) {
  const ValueTag = href ? "a" : "p";
  const valueProps = href
    ? { href, className: "font-mono text-xs font-semibold tracking-wide text-text-main hover:text-accent-primary break-all transition-colors" }
    : { className: "font-mono text-xs font-semibold tracking-wide text-text-main" };

  return (
    <motion.div
      className="bg-card p-4 rounded border border-border flex items-start gap-4 hover:border-accent-primary/50 hover-glow transition-all duration-300"
    >
      <div className="p-2 bg-accent-primary/10 text-accent-primary rounded">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1">{label}</p>
        <ValueTag {...valueProps}>{value}</ValueTag>
      </div>
    </motion.div>
  );
});

export default InfoCard;
