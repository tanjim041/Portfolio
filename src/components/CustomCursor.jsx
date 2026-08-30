import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hitMarkers, setHitMarkers] = useState([]);
  const hitId = useRef(0);

  useEffect(() => {
    // Check if we are on a fine pointer device (desktop) and not using reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReduced) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    const onMouseMove = (e) => {
      if (cursorRef.current) {
        // Direct DOM update for zero lag
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      // Interactive elements: links, buttons, inputs, tabs, etc.
      const interactive = e.target.closest("a, button, [role='button'], [role='tab'], select, input[type='submit'], input[type='button'], .interactive");
      const isTextNode = e.target.closest("input[type='text'], input[type='email'], input[type='password'], input[type='number'], textarea, [contenteditable='true']");
      
      if (interactive && !isTextNode) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
      
      // Hide the custom cursor if hovering over text fields so the native text cursor is visible
      if (isTextNode) {
        if (cursorRef.current) cursorRef.current.classList.add("opacity-0");
      } else {
        if (cursorRef.current) cursorRef.current.classList.remove("opacity-0");
      }
    };

    const onMouseOut = (e) => {
      setIsHovering(false);
      if (cursorRef.current) cursorRef.current.classList.remove("opacity-0");
    };

    const onClick = (e) => {
      setHitMarkers(prev => {
        const newMarker = { id: hitId.current++, x: e.clientX, y: e.clientY };
        // Debounce visually by only allowing max 3 concurrent markers
        return [...prev.slice(-2), newMarker];
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    
    // Add global class to body to hide native cursor
    document.body.classList.add("has-custom-cursor");

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      {/* Base Cursor Reticle */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] transition-opacity duration-150 ease-out"
        style={{ transform: "translate3d(-100px, -100px, 0)" }} // start off screen
      >
        <div 
          className={`absolute flex items-center justify-center transition-all duration-200 ease-out`}
          style={{
            width: "24px",
            height: "24px",
            transform: `translate(-50%, -50%) ${isHovering ? "scale(0.7)" : "scale(1)"}`,
            border: `1.5px solid var(--color-accent-primary)`,
            borderRadius: "50%",
          }}
        >
          {/* Center Dot */}
          <div className="w-1 h-1 bg-accent-primary rounded-full" />
          
          {/* Ticks (N, E, S, W) */}
          <div className={`absolute top-[-4px] left-1/2 w-[1.5px] h-[4px] bg-accent-primary transform -translate-x-1/2 transition-transform duration-200 ${isHovering ? "translate-y-[4px]" : ""}`} />
          <div className={`absolute bottom-[-4px] left-1/2 w-[1.5px] h-[4px] bg-accent-primary transform -translate-x-1/2 transition-transform duration-200 ${isHovering ? "-translate-y-[4px]" : ""}`} />
          <div className={`absolute left-[-4px] top-1/2 h-[1.5px] w-[4px] bg-accent-primary transform -translate-y-1/2 transition-transform duration-200 ${isHovering ? "translate-x-[4px]" : ""}`} />
          <div className={`absolute right-[-4px] top-1/2 h-[1.5px] w-[4px] bg-accent-primary transform -translate-y-1/2 transition-transform duration-200 ${isHovering ? "-translate-x-[4px]" : ""}`} />
        </div>
      </div>

      {/* Hit Markers */}
      {hitMarkers.map(marker => (
        <HitMarker key={marker.id} x={marker.x} y={marker.y} />
      ))}
    </>
  );
}

function HitMarker({ x, y }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 250);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div className="relative w-5 h-5 animate-hit-marker">
        <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-accent-primary -translate-x-1/2 -translate-y-1/2 rotate-45" />
        <div className="absolute top-1/2 left-1/2 w-[2px] h-3 bg-accent-primary -translate-x-1/2 -translate-y-1/2 -rotate-45" />
      </div>
    </div>
  );
}
