import { memo } from "react";
import { motion } from "framer-motion";

const InfoCard = memo(function InfoCard({ icon: Icon, label, value, href }) {
  const ValueTag = href ? "a" : "p";
  const valueProps = href
    ? { href, className: "font-medium text-text-main hover:text-accent-primary" }
    : { className: "font-medium text-text-main" };

  return (
    <motion.div
      className="bg-card p-4 rounded-xl border border-border flex items-start gap-4 hover:border-accent-primary/30 transition-colors"
      whileHover={{ borderColor: "rgba(6, 182, 212, 0.3)" }}
    >
      <div className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-text-muted">{label}</p>
        <ValueTag {...valueProps}>{value}</ValueTag>
      </div>
    </motion.div>
  );
});

export default InfoCard;
