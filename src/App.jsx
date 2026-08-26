import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import ScrollToTop from "./hooks/useScrollToTop";
import Preloader from "./components/Preloader";

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

function MainPortfolio() {
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
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasSeenIntro");
    }
    return false;
  });

  return (
    <>
      <ScrollToTop />
      <div className="bg-grid-overlay" />
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>
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
