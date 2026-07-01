import { memo } from "react";
import { motion } from "framer-motion";

const TimelineItem = memo(function TimelineItem({ item, index, total }) {
  const isEven = index % 2 === 0;
  const number = total - index;

  return (
    <div
      className={`mb-12 flex justify-between items-center w-full ${isEven ? "flex-row-reverse left-timeline" : "right-timeline"}`}
    >
      <div className="order-1 w-5/12" />

      {/* Timeline Circle */}
      <div className="z-20 flex items-center order-1 bg-background shadow-xl w-10 h-10 rounded-full border-4 border-accent-primary flex-shrink-0">
        <span className="mx-auto font-semibold text-lg text-text-main">{number}</span>
      </div>

      {/* Card */}
      <motion.div
        className="order-1 bg-card rounded-xl shadow-xl w-5/12 px-6 py-6 border border-border hover:border-accent-primary/50 transition-colors group"
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Header with Institution Image */}
        <div className="h-32 -mx-6 -mt-6 mb-6 rounded-t-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-secondary/40 group-hover:bg-transparent transition-colors z-10" />
          <img
            src={item.image}
            alt={item.institution}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=300&fit=crop";
            }}
          />
        </div>

        <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
          <span className="text-accent-primary text-sm font-semibold tracking-wide uppercase">
            {item.duration}
          </span>
          <span className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-text-main">
            {item.score}
          </span>
        </div>

        <h3 className="font-poppins font-bold text-xl text-text-main mb-1">{item.degree}</h3>
        <h4 className="text-text-muted font-medium mb-4">{item.institution}</h4>

        <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
      </motion.div>
    </div>
  );
});

export default TimelineItem;
