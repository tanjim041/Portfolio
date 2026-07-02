import { lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";

// Lazy-load sections below the fold for better initial load performance
const About = lazy(() => import("./sections/About"));
const Experience = lazy(() => import("./sections/Experience"));
const Education = lazy(() => import("./sections/Education"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Activities = lazy(() => import("./sections/Activities"));

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Activities />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
