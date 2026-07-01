import { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Lightbulb } from "lucide-react";

const SkillCard = memo(function SkillCard({ name, variant = "hard", index = 0 }) {
  const isHard = variant === "hard";

  const Icon = isHard ? Code2 : Lightbulb;
  const hoverBorder = isHard ? "hover:border-accent-primary" : "hover:border-accent-secondary";
  const hoverShadow = isHard
    ? "hover:box-glow"
    : "hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]";
  const iconColor = isHard ? "text-accent-primary" : "text-accent-secondary";
  const iconHoverBg = isHard
    ? "group-hover:bg-accent-primary"
    : "group-hover:bg-accent-secondary";

  return (
    <motion.div
      className={`bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 ${hoverBorder} ${hoverShadow} transition-all duration-300 group`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${iconColor} ${iconHoverBg} group-hover:text-background transition-colors duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-medium text-text-main text-center">{name}</h4>
    </motion.div>
  );
});

export default SkillCard;
