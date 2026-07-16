import { useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Download, Mail, ChevronsDown } from "lucide-react";
import Particles from "@tsparticles/react";
import useTypingEffect from "../hooks/useTypingEffect";
import SocialIcon from "../components/SocialIcon";
import portfolioData from "../data/portfolio";

const particlesOptions = {
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: "#06B6D4" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.3 } },
    size: { value: { min: 1, max: 3 } },
    links: {
      enable: true,
      distance: 150,
      color: "#06B6D4",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
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
      grab: { distance: 140, links: { opacity: 0.5 } },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};

// Isolated sub-component so the typing state updates never re-render
// the parent Hero (and therefore never disturb the Particles canvas).
const TypingText = memo(function TypingText({ titles }) {
  const typedText = useTypingEffect(titles);
  return (
    <div className="inline-flex items-center text-xl md:text-2xl font-semibold text-accent-secondary">
      <span className="mr-2">&gt;</span>
      <span className="border-r-2 border-accent-secondary pr-1">{typedText}</span>
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

  const particlesLoaded = useCallback(async () => {
    // Particles loaded successfully
  }, []);

  const memoizedOptions = useMemo(() => particlesOptions, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Particles Background — rendered once, never re-mounts */}
      <ParticlesBackground options={memoizedOptions} onLoaded={particlesLoaded} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.p
          className="text-accent-primary font-medium tracking-wide uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello, World! I am
        </motion.p>

        <motion.h1
          className="font-poppins text-5xl md:text-7xl font-bold tracking-tight mb-4 text-text-main"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          {personal.name}
        </motion.h1>

        <motion.h2
          className="text-xl md:text-3xl text-text-muted font-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          {personal.subtitle}
        </motion.h2>

        {/* Typing Animation — isolated so only this tiny node re-renders */}
        <motion.div
          className="h-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        >
          <TypingText titles={personal.titles} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a
            href="/cv/Tanjim's Resume.pdf"
            download
            className="px-8 py-3 bg-accent-primary text-background font-semibold rounded-full hover:bg-accent-secondary hover-glow transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-5 h-5" /> Download CV
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-card border border-border text-text-main font-semibold rounded-full hover:bg-secondary hover:border-accent-primary/50 transition-all duration-300 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" /> Contact Me
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-12 flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {socials.map((social) => (
            <SocialIcon
              key={social.platform}
              platform={social.platform}
              link={social.link}
              icon={social.icon}
              variant="inline"
            />
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            className="text-text-muted hover:text-accent-primary transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronsDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
