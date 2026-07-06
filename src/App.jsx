import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import ScrollToTop from "./hooks/useScrollToTop";

// Lazy-load sections below the fold for better initial load performance
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Education = lazy(() => import("./sections/Education"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
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
        <Activities />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
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
