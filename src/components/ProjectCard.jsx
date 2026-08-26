import { memo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SortingVisualizer from "./SortingVisualizer";

const ProjectCard = memo(function ProjectCard({ project, index = 0, featured = false }) {
  const { title, image, description, techStack, githubLink, liveLink, status, date } = project;

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Scale rotation bounds (Featured card tilts less than standard cards for visual balance)
    const factor = featured ? 3 : 8;
    const rx = -(y / (box.height / 2)) * factor;
    const ry = (x / (box.width / 2)) * factor;
    
    setRotateX(rx);
    setRotateY(ry);
  }, [featured, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  const cardStyle = prefersReducedMotion
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${featured ? 1.01 : 1.02}, ${featured ? 1.01 : 1.02}, 1.02)`,
        transition: "transform 0.15s ease-out, border-color 0.3s ease",
      };

  if (featured) {
    return (
      <motion.div
        className="bg-card border border-border rounded overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:border-accent-primary/50 hover-glow transition-all duration-300 w-full cursor-default"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Project Image */}
        <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative min-h-[280px]">
          <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10 duration-300" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=600&fit=crop";
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider rounded bg-background/80 backdrop-blur border border-border text-accent-primary">
              Featured Project
            </span>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider rounded bg-background/80 backdrop-blur border border-border text-text-main">
              {status}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-center">
          {date && (
            <span className="text-accent-primary font-mono text-[10px] tracking-wider uppercase mb-3">
              {date}
            </span>
          )}
          <h3 className="font-poppins text-2xl md:text-3xl font-black text-text-main mb-4 group-hover:text-accent-primary transition-colors uppercase leading-none">
            {title}
          </h3>
          <p className="text-text-muted text-sm md:text-base mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 font-mono text-[10px] rounded bg-secondary text-text-muted border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary hover:bg-text-main hover:text-background rounded text-xs font-mono tracking-wider uppercase font-bold transition-colors ${
                liveLink ? "flex-1" : "w-full"
              }`}
            >
              <FaGithub className="w-3.5 h-3.5" /> Source Code
            </a>
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 py-2.5 px-4 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background rounded text-xs font-mono tracking-wider uppercase font-bold hover-glow transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card border border-border rounded overflow-hidden flex flex-col group hover:border-accent-primary/50 hover-glow transition-all duration-300 h-full w-full cursor-default"
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Project Image */}
      <div className="h-56 overflow-hidden relative flex-shrink-0 bg-secondary/15">
        {project.isVisualizer ? (
          <SortingVisualizer />
        ) : (
          <>
            <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10 duration-300" />
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
              }}
            />
          </>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider rounded bg-background/80 backdrop-blur border border-border text-text-main">
            {status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        {date && (
          <span className="text-accent-primary font-mono text-[10px] tracking-wider uppercase mb-2">
            {date}
          </span>
        )}

        <h3 className="font-poppins text-xl font-bold text-text-main mb-3 group-hover:text-accent-primary transition-colors uppercase leading-none">
          {title}
        </h3>

        <p className="text-text-muted text-sm mb-6 flex-1 leading-relaxed">{description}</p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 font-mono text-[10px] rounded bg-secondary text-text-muted border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-2 px-4 bg-secondary hover:bg-text-main hover:text-background rounded text-xs font-mono tracking-wider uppercase font-bold transition-colors ${
              liveLink ? "flex-1" : "w-full"
            }`}
            aria-label={`View ${title} source code on GitHub`}
          >
            <FaGithub className="w-3.5 h-3.5" /> Code
          </a>

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 py-2 px-4 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background rounded text-xs font-mono tracking-wider uppercase font-bold hover-glow transition-all duration-300"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
