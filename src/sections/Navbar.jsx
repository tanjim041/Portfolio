import { useState, useCallback, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import useScrollPosition from "../hooks/useScrollPosition";
import portfolioData from "../data/portfolio";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Activities", href: "#activities" },
];

const educationSubLinks = [
  { label: "School", href: "#school" },
  { label: "College", href: "#college" },
  { label: "University", href: "#university" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Gate the pill effect to desktop widths only (md = 768px).
  // Recalculated on resize so rotating a device or resizing the window
  // correctly enters/exits pill mode.
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const shouldReduceMotion = useReducedMotion();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [activeSection, setActiveSection] = useState("home");

  // Scrollspy logic — dual approach for reliability:
  // 1. IntersectionObserver fires when a section enters the focal band
  // 2. Scroll-position fallback: on every scroll, find which section's top
  //    is nearest to (but above) the 1/3 viewport mark — covers gaps between
  //    IntersectionObserver windows and handles sections that are very tall.
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ["home", "experience", "skills", "projects", "activities", "education"];

    // ── Fallback: recalculate on scroll ──────────────────────────────────
    const onScroll = () => {
      const viewportMid = window.innerHeight * 0.35; // 35% from top
      let closest = sectionIds[0];
      let closestDist = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // We want sections whose top is above our focal line (top <= viewportMid)
        // and pick the one whose top is closest to (but not past) viewportMid.
        const dist = Math.abs(top - viewportMid);
        if (top <= viewportMid + 80 && dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });

      setActiveSection(closest);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Run once on mount to set initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync with terminal theme change events
  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail);
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      const scroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          // scroll-mt-32 is handled by CSS, but custom scrollIntoView ensures it reaches the right spot
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      };

      // Execute immediately and then slightly later in case lazy-loaded chunks just resolved
      scroll();
      setTimeout(scroll, 150);
      setTimeout(scroll, 300);
      
      if (mobileOpen) setMobileOpen(false);
    }
  }, [isHome, mobileOpen]);

  // Helper to construct URLs based on current page
  const getUrl = (href) => {
    if (isHome) return href;
    return `/${href}`;
  };

  // ─── Pill animation values ───────────────────────────────────────────
  // Desktop only (isDesktop): interpolate between full-width-flush and
  // floating-pill. Mobile always stays in flushStyle — the inner backdrop
  // div handles the scrolled background on narrow viewports.
  //
  // We use explicit framer-motion animate values (not CSS transitions) so
  // maxWidth, borderRadius, margin, and background all interpolate in sync.
  // CSS transitions can't tween maxWidth or border-radius together reliably.

  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : 0.35,
    ease: "easeOut",
  };

  // Whether the pill is actively engaged
  const isPill = isScrolled && isDesktop;

  // Pill state — desktop, scrolled past threshold
  const pillStyle = {
    maxWidth: "64rem",        // fits all nav items without wrapping at 1280px+
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "12px",
    borderRadius: "9999px",   // full capsule
    backgroundColor: "var(--pill-bg)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--color-border)",
    paddingTop: "6px",
    paddingBottom: "6px",
    width: "calc(100% - 2rem)",
  };

  // Full-width flush state — top of page, or always on mobile
  const flushStyle = {
    maxWidth: "100%",
    marginLeft: "0px",
    marginRight: "0px",
    marginTop: "0px",
    borderRadius: "0px",
    backgroundColor: "transparent",
    boxShadow: "none",
    paddingTop: "16px",
    paddingBottom: "16px",
    width: "100%",
  };

  return (
    <>
      {/*
        CSS custom property for the pill background — resolves to the correct
        theme color without needing to read a JS theme variable here.
        Defined inline so it's scoped to the nav and picks up .dark class changes.
      */}
      <style>{`
        :root { --pill-bg: rgba(250, 249, 246, 0.92); }
        .dark  { --pill-bg: rgba(14, 14, 16, 0.92); }
      `}</style>

      {/*
        Outer fixed wrapper — always full-width, always z-50.
        This is the scroll-position anchor; the motion.nav inside it is
        what morphs into the pill. This separation means the mobile menu
        (which breaks out below the nav with position:absolute) still
        aligns to the full viewport width even when the pill is active.
      */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.nav
          id="navbar"
          role="navigation"
          aria-label="Main navigation"
          className="pointer-events-auto"
          animate={isPill ? pillStyle : flushStyle}
          transition={transitionConfig}
          style={{ position: "relative", overflow: "visible" }}
        >
          {/*
            Mobile scrolled background — shown only when NOT in pill mode.
            On desktop the pill carries its own opaque background; on mobile
            this div provides the classic backdrop-blur/border treatment.
          */}
          {isScrolled && !isPill && (
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-md shadow-md border-b border-border pointer-events-none -z-10"
              aria-hidden="true"
            />
          )}

          <div
            className={`relative z-10 ${
              isPill
                ? // Pill state: tighter horizontal padding to suit the pill shape
                  "px-5 sm:px-6"
                : // Flush state: standard wide-screen padding
                  "px-4 sm:px-6 lg:px-8"
            } transition-[padding] duration-300`}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="font-poppins font-bold text-2xl tracking-tighter text-text-main group"
                  aria-label={`${portfolioData.personal.name} Portfolio`}
                >
                  Tanjim&apos;s{" "}
                  <span className="text-accent-primary group-hover:text-glow transition-all duration-300">
                    Portfolio
                  </span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-2 items-center">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a
                      key={link.href + link.label}
                      href={getUrl(link.href)}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                        isActive ? "text-accent-primary" : "text-text-muted hover:text-text-main"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-secondary border border-border rounded z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}

                {/* Education Dropdown */}
                <div className="relative group">
                  <a
                    href={getUrl("#education")}
                    onClick={(e) => handleNavClick(e, "#education")}
                    className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 ${
                      activeSection === "education" ? "text-accent-primary" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      Education <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                    {activeSection === "education" && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-secondary border border-border rounded z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {educationSubLinks.map((sub) => (
                      <a
                        key={sub.label}
                        href={getUrl(sub.href)}
                        onClick={(e) => handleNavClick(e, sub.href)}
                        className="block px-4 py-2 font-mono text-xs tracking-wider uppercase hover:bg-secondary hover:text-accent-primary transition-colors text-text-muted"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact — last nav link, accent-colored to stay prominent as CTA */}
                <a
                  href={getUrl("#contact")}
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase font-semibold transition-colors duration-300 ${
                    activeSection === "contact"
                      ? "text-accent-primary"
                      : "text-accent-primary/70 hover:text-accent-primary"
                  }`}
                >
                  <span className="relative z-10">Contact</span>
                  {activeSection === "contact" && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-secondary border border-border rounded z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>

                {/* Theme Toggle — bookend at far right of the nav group */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-text-muted hover:text-accent-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle dark/light mode"
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
              </div>

              {/* Mobile Menu Action Bar */}
              <div className="md:hidden flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-text-muted hover:text-accent-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle dark/light mode"
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>

                <button
                  onClick={toggleMobile}
                  className="text-text-main hover:text-accent-primary focus:outline-none p-2"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/*
            py shim — when at top the nav needs its original vertical padding.
            We don't animate padding on the outer nav (it would fight the pill
            paddingTop/Bottom values), so we use a shim div instead.
          */}
          <div
            className={`transition-all ${
              isScrolled ? "h-0" : "h-2"
            }`}
            aria-hidden="true"
          />
        </motion.nav>

        {/* Mobile Menu — breaks out of the pill, always full-width */}
        <div
          id="mobile-menu"
          className={`md:hidden bg-secondary/95 backdrop-blur-lg border-b border-border w-full transition-all duration-300 pointer-events-auto ${
            mobileOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[
              { label: "Home", href: "#home" },
              { label: "Experience", href: "#experience" },
              { label: "Education", href: "#education" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Activities", href: "#activities" },
              { label: "Contact", href: "#contact" },
            ].map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={getUrl(link.href)}
                  onClick={closeMobile}
                  className={`block px-3 py-2 font-mono text-xs tracking-wider uppercase hover:bg-card ${
                    isActive
                      ? "text-accent-primary bg-background/50 font-bold border-l-2 border-accent-primary"
                      : "text-text-muted hover:text-accent-primary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
