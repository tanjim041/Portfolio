import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ActivityCard — receives animation variant from Activities stagger container.
 * Displays monospace category tags from activity.tags[].
 */
const ActivityCard = memo(function ActivityCard({ activity, variants }) {
  const { title, image, description, link, tags } = activity;

  const CardContent = (
    <>
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

        {/* Category tags overlaid on image */}
        {tags && tags.length > 0 && (
          <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] font-bold tracking-widest uppercase text-accent-primary bg-background/80 border border-accent-primary/30 rounded px-2 py-0.5 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="font-poppins text-lg font-bold text-text-main group-hover:text-accent-primary transition-colors uppercase leading-none">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1">
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </>
  );

  const containerClasses =
    "bg-card border border-border rounded overflow-hidden group hover:border-accent-primary/50 hover-glow transition-all duration-300 flex flex-col h-full cursor-pointer";

  if (link) {
    return (
      <motion.div variants={variants} className="h-full">
        <Link to={link} className={containerClasses}>
          {CardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={variants} className={containerClasses}>
      {CardContent}
    </motion.div>
  );
});

export default ActivityCard;
