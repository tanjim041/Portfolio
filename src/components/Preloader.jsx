import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "> booting portfolio...",
  "> tanjim islam — cse @ aust",
  "> cf handle: tanjim999 [loaded]",
  "> done."
];

// Easily editable word list for the preloader sequence
const preloaderWords = [
  { letter: "T", word: "Technical" },
  { letter: "A", word: "Ambitious" },
  { letter: "N", word: "Nimble" },
  { letter: "J", word: "Just ships it" },
  { letter: "I", word: "Innovative" },
  { letter: "M", word: "Methodical" }
];

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("terminal"); // "terminal" -> "letters" -> "words"
  const [visibleLines, setVisibleLines] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleSkip = useCallback(() => {
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
    const handleKeyDown = () => {
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSkip]);

  // Sequence timing and typewriting
  useEffect(() => {
    if (prefersReducedMotion) {
      // Instantly show terminal lines and words, then fade out quickly
      setVisibleLines(lines);
      setPhase("words");
      const t = setTimeout(() => {
        handleSkip();
      }, 900);
      return () => clearTimeout(t);
    }

    if (phase === "terminal") {
      let lineIdx = 0;
      let charIdx = 0;
      let currentText = "";
      let timer;

      const typeChar = () => {
        if (lineIdx >= lines.length) {
          // Switch to letters phase after a brief pause
          timer = setTimeout(() => setPhase("letters"), 300);
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
          timer = setTimeout(typeChar, 10); // fast typing
        } else {
          timer = setTimeout(() => {
            lineIdx++;
            charIdx = 0;
            currentText = "";
            typeChar();
          }, 50); // fast break between lines
        }
      };

      typeChar();
      return () => clearTimeout(timer);
    } else if (phase === "letters") {
      // Wait for letters to stagger in, then change to words
      const t = setTimeout(() => setPhase("words"), 1100);
      return () => clearTimeout(t);
    } else if (phase === "words") {
      // Wait for words to be readable, then exit
      const t = setTimeout(() => handleSkip(), 1400);
      return () => clearTimeout(t);
    }
  }, [phase, prefersReducedMotion, handleSkip]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col justify-center items-center px-6 cursor-pointer select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
      onClick={handleSkip}
    >
      <div className="relative w-full max-w-xl mx-auto flex flex-col justify-center items-center min-h-[400px]">
        {/* Terminal Phase */}
        <AnimatePresence>
          {phase === "terminal" && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-start font-mono w-full"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letters & Words Sequence Phase */}
        <AnimatePresence>
          {(phase === "letters" || phase === "words") && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center space-y-1 md:space-y-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {preloaderWords.map((item, idx) => (
                <div key={item.letter} className="relative h-12 md:h-16 flex items-center justify-center w-full">
                  {/* Letter Phase */}
                  <AnimatePresence>
                    {phase === "letters" && (
                      <motion.span
                        className="absolute font-poppins font-black text-5xl md:text-7xl text-text-main"
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0 : 0.4, 
                          delay: prefersReducedMotion ? 0 : idx * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        {item.letter}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Word Phase */}
                  <AnimatePresence>
                    {phase === "words" && (
                      <motion.span
                        className="absolute font-poppins font-bold text-3xl md:text-5xl tracking-tight whitespace-nowrap text-text-main"
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0 : 0.5, 
                          delay: prefersReducedMotion ? 0 : idx * 0.08,
                          ease: "easeOut"
                        }}
                      >
                        <span className="text-accent-primary">{item.letter}</span>
                        {item.word.slice(1)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-[9px] text-text-muted/40 uppercase tracking-widest pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        [ Press any key or tap to skip ]
      </motion.div>
    </motion.div>
  );
}
