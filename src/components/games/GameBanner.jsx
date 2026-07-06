import { memo } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

const GameBanner = memo(function GameBanner({ name, category, bannerImage }) {
  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden">
      {/* Banner Image */}
      <img
        src={bannerImage}
        alt={`${name} Banner`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=900&fit=crop";
        }}
      />

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30 pointer-events-none" />

      {/* Banner Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-primary/20 text-accent-primary border border-accent-primary/30 mb-3">
              <Gamepad2 className="w-3.5 h-3.5" /> {category}
            </span>

            <h1 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-text-main tracking-tight">
              {name}
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default GameBanner;
