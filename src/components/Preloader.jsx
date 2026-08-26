import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const lines = [
  "> booting portfolio...",
  "> tanjimul islam — cse @ aust",
  "> cf handle: tanjim999 [loaded]",
  "> done."
];

export default function Preloader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem("hasSeenIntro", "true");
    onComplete();
  }, [onComplete]);

  // Disable scroll while active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Listen to keyboard & tap events for skipping
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Any key skips
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSkip]);

  // Typewriter effect logic
  useEffect(() => {
    if (prefersReducedMotion) {
      handleSkip();
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let currentText = "";
    let timer;

    const typeChar = () => {
      if (lineIdx >= lines.length) {
        // Complete preloader after a brief pause
        timer = setTimeout(() => {
          handleSkip();
        }, 300);
        return;
      }

      const currentLine = lines[lineIdx];
      if (charIdx < currentLine.length) {
        currentText += currentLine[charIdx];
        setVisibleLines((prev) => {
          const next = [...prev];
          next[lineIdx] = currentText;
          return next;
        });
        charIdx++;
        timer = setTimeout(typeChar, 15); // Type character quickly (15ms)
      } else {
        // Break between lines (60ms)
        timer = setTimeout(() => {
          lineIdx++;
          charIdx = 0;
          currentText = "";
          typeChar();
        }, 60);
      }
    };

    typeChar();

    return () => clearTimeout(timer);
  }, [handleSkip, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col justify-center px-6 md:px-12 cursor-pointer select-none"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        opacity: 0,
        transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } // Fast exponential easeOut
      }}
      onClick={handleSkip}
    >
      <div className="max-w-xl mx-auto w-full font-mono">
        <div className="flex flex-col items-start">
          {visibleLines.map((text, idx) => (
            <p
              key={idx}
              className="text-xs md:text-sm tracking-wide text-text-main mb-2 leading-relaxed"
            >
              {text}
              {idx === visibleLines.length - 1 && idx < lines.length - 1 && (
                <span className="animate-pulse ml-1 text-accent-primary">█</span>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Skip indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-[9px] text-text-muted/40 uppercase tracking-widest pointer-events-none">
        [ Press any key or tap to skip ]
      </div>
    </motion.div>
  );
}
