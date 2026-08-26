import { useCallback, useMemo, memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, ChevronsDown } from "lucide-react";
import Particles from "@tsparticles/react";
import useTypingEffect from "../hooks/useTypingEffect";
import SocialIcon from "../components/SocialIcon";
import Terminal from "../components/Terminal";
import portfolioData from "../data/portfolio";

const particlesOptions = {
  particles: {
    number: { value: 35, density: { enable: true, area: 800 } },
    color: { value: "#FF7E47" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.05, max: 0.2 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#FF7E47",
      opacity: 0.1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
      bounce: false,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.3 } },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

// Isolated sub-component so the typing state updates never re-render
// the parent Hero (and therefore never disturb the Particles canvas).
const TypingText = memo(function TypingText({ titles }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const typedText = useTypingEffect(titles);

  if (prefersReducedMotion) {
    return (
      <div className="inline-flex items-center font-mono text-sm md:text-base text-accent-primary tracking-wider">
        <span className="mr-2 text-text-muted select-none">&gt;</span>
        <span className="pr-1.5 font-bold">{titles[0]}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center font-mono text-sm md:text-base text-accent-primary tracking-wider">
      <span className="mr-2 text-text-muted select-none">&gt;</span>
      <span className="border-r-2 border-accent-primary pr-1.5 font-bold">{typedText}</span>
    </div>
  );
});

// Memoised Particles wrapper — prevents re-renders caused by parent state changes.
const ParticlesBackground = memo(function ParticlesBackground({ options, onLoaded }) {
  return (
    <Particles
      id="tsparticles"
      particlesLoaded={onLoaded}
      options={options}
      className="absolute inset-0 z-0"
    />
  );
});

export default function Hero() {
  const { personal, socials } = portfolioData;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Particles loaded successfully
  }, []);

  const memoizedOptions = useMemo(() => particlesOptions, []);

  const nameParts = personal.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Particles Background — rendered once, never re-mounts */}
      <ParticlesBackground options={memoizedOptions} onLoaded={particlesLoaded} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-9 flex flex-col items-start">
          
          {/* Eyebrow marker */}
          <motion.div
            className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-accent-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="w-6 h-[1px] bg-accent-primary" />
            <span>00 / Hello, World! I am</span>
          </motion.div>

          {/* Massive Redesigned Typography */}
          <motion.h1
            className="font-poppins text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.85] text-text-main mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {firstName}{" "}
            <span className="font-light italic text-accent-primary block sm:inline">
              {lastName}
            </span>
          </motion.h1>

          <motion.h2
            className="text-lg md:text-2xl text-text-muted font-mono tracking-wide mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {personal.subtitle}
          </motion.h2>

          {/* Typing Animation in Monospace */}
          <motion.div
            className="h-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <TypingText titles={personal.titles} />
          </motion.div>

          {/* Geometric Monospace Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a
              href="/cv/Tanjim's Resume.pdf"
              download
              className="px-6 py-3.5 bg-accent-primary text-background font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent-secondary hover-glow transition-all duration-300 flex items-center gap-2 border border-accent-primary rounded"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 bg-transparent border border-border text-text-main font-mono text-xs uppercase tracking-widest font-bold hover:bg-secondary hover:border-accent-primary transition-all duration-300 flex items-center gap-2 rounded"
            >
              <Mail className="w-4 h-4" /> Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex space-x-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="font-mono text-[10px] tracking-wider uppercase text-text-muted/40">Connect //</span>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <SocialIcon
                  key={social.platform}
                  platform={social.platform}
                  link={social.link}
                  icon={social.icon}
                  variant="inline"
                />
              ))}
            </div>
          </motion.div>

          {/* Interactive CLI Terminal */}
          <motion.div
            className="mt-8 w-full"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.8 }}
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Asymmetric Side Details (Subtle layout lines/info) */}
        <div className="hidden lg:col-span-3 lg:flex flex-col items-end justify-center h-full border-l border-border/40 pl-8 font-mono text-[10px] tracking-widest text-text-muted/40 space-y-6">
          <div className="text-right">
            <span className="text-accent-primary block mb-1">LOC</span>
            <span>{personal.location.split(",")[0]}</span>
          </div>
          <div className="text-right">
            <span className="text-accent-primary block mb-1">SYS</span>
            <span>NEXT.JS // VITE // TAILWIND</span>
          </div>
          <div className="text-right">
            <span className="text-accent-primary block mb-1">CP</span>
            <span>CODEFORCES ID: tanjim999</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <a
            href="#about"
            className="text-text-muted hover:text-accent-primary transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronsDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
