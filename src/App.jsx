import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import ScrollToTop from "./hooks/useScrollToTop";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

// Lazy-load sections below the fold for better initial load performance
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Education = lazy(() => import("./sections/Education"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const CodeforcesStats = lazy(() => import("./sections/CodeforcesStats"));
const Activities = lazy(() => import("./sections/Activities"));

// Lazy-load new games pages
const GamesPage = lazy(() => import("./pages/GamesPage"));
const GameDetailPage = lazy(() => import("./pages/GameDetailPage"));

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

import { useLocation } from "react-router-dom";

function MainPortfolio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      let attempts = 0;
      
      const tryScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < 20) { // Try for up to 2 seconds
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      
      tryScroll();
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <CodeforcesStats />
        <Activities />
      </Suspense>
    </>
  );
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <ScrollToTop />
      <div className="bg-grid-overlay" />
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>
      <CustomCursor />
      <Navbar />
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:slug" element={<GameDetailPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
