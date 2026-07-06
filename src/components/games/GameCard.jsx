import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

const GameCard = memo(function GameCard({ game, index = 0 }) {
  const { name, slug, category, status, coverImage, description, hasProfile } = game;

  return (
    <motion.div
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 hover:border-accent-primary/50 transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Cover Image */}
      <div className="h-48 overflow-hidden relative flex-shrink-0">
        <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10 duration-300" />
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop";
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              status === "Active"
                ? "bg-accent-primary/20 text-accent-primary border-accent-primary/30"
                : status === "Completed"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-text-muted/10 text-text-muted border-border"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-accent-secondary text-xs font-semibold tracking-wider uppercase mb-2">
          {category}
        </span>

        <h3 className="font-poppins text-xl font-bold text-text-main mb-3 group-hover:text-accent-primary transition-colors">
          {name}
        </h3>

        <p className="text-text-muted text-sm mb-6 flex-1 leading-relaxed">{description}</p>

        {/* Action Link — conditionally render based on hasProfile */}
        {hasProfile !== false && (
          <div className="mt-auto pt-4 border-t border-border/50">
            <Link
              to={`/games/${slug}`}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background rounded-lg text-sm font-medium transition-colors"
              aria-label={`View ${name} gaming profile`}
            >
              <Gamepad2 className="w-4 h-4" /> View Profile
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default GameCard;
