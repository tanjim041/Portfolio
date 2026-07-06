import { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ProjectCard = memo(function ProjectCard({ project, index = 0 }) {
  const { title, image, description, techStack, githubLink, liveLink, status, date } = project;

  return (
    <motion.div
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 hover:border-accent-primary/50 transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Project Image */}
      <div className="h-56 overflow-hidden relative flex-shrink-0">
        <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10 duration-300" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur border border-border text-text-main">
            {status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Date — only shown when available */}
        {date && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-accent-primary text-xs font-semibold tracking-wider uppercase">
              {date}
            </span>
          </div>
        )}

        <h3 className="font-poppins text-xl font-bold text-text-main mb-3 group-hover:text-accent-primary transition-colors">
          {title}
        </h3>

        {/* Description — flex-1 pushes tech stack + buttons to the bottom */}
        <p className="text-text-muted text-sm mb-6 flex-1 leading-relaxed">{description}</p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded bg-secondary text-text-muted border border-border"
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
            className={`flex items-center justify-center gap-2 py-2 px-4 bg-secondary hover:bg-white hover:text-black rounded-lg text-sm font-medium transition-colors ${
              liveLink ? "flex-1" : "w-full"
            }`}
            aria-label={`View ${title} source code on GitHub`}
          >
            <FaGithub className="w-4 h-4" /> Code
          </a>

          {/* Demo button — only shown when a live link exists */}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 py-2 px-4 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background rounded-lg text-sm font-medium transition-colors"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
