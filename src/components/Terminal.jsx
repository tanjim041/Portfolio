import { useState, useEffect, useRef, useCallback, memo } from "react";

const presetCommands = ["help", "whoami", "skills", "projects", "contact", "theme", "clear"];

const initialHistory = [
  { type: "output", text: "Tanjim OS [Version 2.0.0]" },
  { type: "output", text: "Type 'help' to see list of available commands." },
];

export default function Terminal() {
  const [history, setHistory] = useState(initialHistory);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "") return;

    // Save to prompt history
    setHistory((prev) => [...prev, { type: "input", text: cmd }]);

    let response = "";
    switch (trimmed) {
      case "help":
        response = "Available commands: whoami, skills, projects, contact, theme, clear";
        break;
      case "whoami":
        response = "Md. Tanjimul Islam — Computer Science & Engineering student at AUST & Competitive Programmer. Specialist rating on Codeforces.";
        break;
      case "skills":
        response = "Languages: C/C++, Python, Java, JavaScript, Dart. Tech: React, Node.js, Express, Flutter, Tailwind CSS, MongoDB, MySQL.";
        break;
      case "projects":
        response = "Featured: BacheLORE (course adviser). Also shipped AUSThir (mobile assistant). Scroll down to Projects section (05) for asymmetric showcases.";
        break;
      case "contact":
        response = "Email: tanjimul.islam.aust@gmail.com | GitHub: tanjim041 | LinkedIn: md-tanjimul-islam";
        break;
      case "theme":
        const currentTheme = localStorage.getItem("theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        window.dispatchEvent(new CustomEvent("themechange", { detail: nextTheme }));
        response = `System theme switched to: ${nextTheme.toUpperCase()}`;
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        response = `Command not found: '${trimmed}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { type: "output", text: response }]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const val = e.currentTarget.value;
      if (val.trim()) {
        setCmdHistory((prev) => [...prev, val]);
        setHistoryIdx(-1);
      }
      handleCommand(val);
      e.currentTarget.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      e.currentTarget.value = cmdHistory[nextIdx];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        e.currentTarget.value = "";
      } else {
        setHistoryIdx(nextIdx);
        e.currentTarget.value = cmdHistory[nextIdx];
      }
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="bg-card border border-border rounded font-mono text-xs w-full max-w-xl overflow-hidden shadow-lg hover:border-accent-primary/30 transition-all duration-300"
      onClick={focusInput}
    >
      {/* Top window bar */}
      <div className="bg-secondary/60 px-4 py-2.5 border-b border-border flex items-center justify-between select-none">
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-[10px] text-text-muted/60 tracking-wider">tanjim@portfolio: ~</span>
        <span className="text-[10px] text-text-muted/40 uppercase">sh</span>
      </div>

      {/* Terminal stdout body */}
      <div
        ref={bodyRef}
        className="p-4 h-48 overflow-y-auto flex flex-col gap-1.5 text-text-main/90 leading-relaxed scrollbar-thin select-text"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.type === "input" ? (
              <p className="text-text-main flex gap-1.5 items-center">
                <span className="text-accent-primary font-bold">tanjim@portfolio:~$</span>
                <span>{line.text}</span>
              </p>
            ) : (
              <p className="text-text-muted/90">{line.text}</p>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex gap-1.5 items-center mt-1">
          <span className="text-accent-primary font-bold">tanjim@portfolio:~$</span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-none outline-none text-text-main font-mono text-xs focus:ring-0 p-0"
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal command input"
            />
            {/* Blinking cursor emulator */}
            {!prefersReducedMotion && (
              <span className="w-1.5 h-3 bg-accent-primary absolute bottom-0.5 animate-pulse pointer-events-none opacity-80" style={{ left: `${(inputRef.current?.value || "").length * 7.2}px` }} />
            )}
          </div>
        </div>
      </div>

      {/* Quick Tap Command Chips (Mobile fallback / Desktop shortcuts) */}
      <div className="flex flex-wrap gap-1.5 p-3 bg-secondary/30 border-t border-border select-none">
        {presetCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 bg-secondary hover:bg-accent-primary/10 hover:text-accent-primary border border-border/60 hover:border-accent-primary/40 rounded font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
