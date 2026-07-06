import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Gamepad2, Award, ChevronRight, Heart, Zap } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import GameCard from "../components/games/GameCard";
import { gamesData } from "../data/games";

const particlesOptions = {
  particles: {
    number: { value: 30, density: { enable: true, area: 800 } },
    color: { value: "#06B6D4" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.25 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#06B6D4",
      opacity: 0.15,
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
      grab: { distance: 140, links: { opacity: 0.4 } },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

export default function GamesPage() {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);
  const memoizedOptions = useMemo(() => particlesOptions, []);

  // Filter games based on current features
  const mainGame = gamesData.find((g) => g.isMain);
  const favoriteGames = gamesData.filter((g) => g.isFavorite);

  return (
    <div className="bg-background min-h-screen text-text-main relative overflow-hidden">
      {/* Particles Background */}
      {particlesReady && (
        <Particles
          id="tsparticles-games"
          particlesLoaded={particlesLoaded}
          options={memoizedOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none z-[1]" />

      {/* Breadcrumbs */}
      <div className="relative z-10 pt-28 pb-4 border-b border-border/20">
        <Container>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-main font-medium">Games</span>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent-primary/10 text-accent-primary border border-accent-primary/20 inline-block mb-4">
              Gaming Profile
            </span>
            <h1 className="font-poppins text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-text-main via-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Games
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-8">
              A showcase of the games I enjoy playing, my competitive achievements, player profiles,
              rankings, and gaming journey.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured / Highlights Section */}
      <section className="relative z-10 py-12 border-t border-border/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Current Main Game Card */}
            {mainGame && (
              <motion.div
                className="bg-gradient-to-br from-card to-secondary border border-accent-primary/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center hover:border-accent-primary transition-all duration-300 relative overflow-hidden group box-glow"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Decorative glowing light */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl group-hover:bg-accent-primary/20 transition-all" />

                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden relative flex-shrink-0">
                  <img
                    src={mainGame.coverImage}
                    alt={mainGame.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-accent-primary animate-pulse" />
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <span className="flex items-center gap-1.5 text-accent-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5" /> Current Main Game
                  </span>
                  <h3 className="font-poppins text-2xl font-bold text-text-main mb-2">
                    {mainGame.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 leading-relaxed">
                    {mainGame.description}
                  </p>
                  <Link
                    to={`/games/${mainGame.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-secondary hover:text-accent-primary transition-colors"
                  >
                    View Stats & Profile <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Favorite Games Highlights */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-border/85 transition-all duration-300"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-left">
                <span className="flex items-center gap-1.5 text-accent-secondary text-xs font-semibold uppercase tracking-wider mb-3">
                  <Heart className="w-3.5 h-3.5" /> Favorite Games
                </span>
                <h3 className="font-poppins text-2xl font-bold text-text-main mb-4">
                  My Preferred Titles
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  These are the games where I have invested the most time and developed the highest
                  skill level, participating in competitive matchmaking and tournaments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {favoriteGames.map((game) => (
                  <Link
                    key={game.slug}
                    to={`/games/${game.slug}`}
                    className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-accent-secondary/10 hover:border-accent-secondary/30 border border-border transition-all duration-300"
                  >
                    <Gamepad2 className="w-5 h-5 text-accent-secondary flex-shrink-0" />
                    <span className="font-semibold text-sm truncate">{game.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Games Showcase Grid */}
      <section className="relative z-10 py-16 bg-secondary/30">
        <Container>
          <SectionTitle prefix="All Games" accent="Showcase" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {gamesData.map((game, index) => (
              <GameCard key={game.slug} game={game} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
