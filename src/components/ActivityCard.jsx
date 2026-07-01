import { memo } from "react";
import { motion } from "framer-motion";

const ActivityCard = memo(function ActivityCard({ activity, index = 0 }) {
  const { title, image, description } = activity;

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden group hover:border-accent-secondary/50 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-background/60 group-hover:bg-background/20 transition-colors z-10 duration-300" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop";
          }}
        />

        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="font-poppins text-lg font-bold text-text-main group-hover:text-accent-secondary transition-colors">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
});

export default ActivityCard;
