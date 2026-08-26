import { useState, useCallback, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
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
  { label: "School", href: "#education" },
  { label: "College", href: "#education" },
  { label: "University", href: "#education" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [activeSection, setActiveSection] = useState("home");

  // Scrollspy logic
  useEffect(() => {
    if (!isHome) return;

    const sections = ["home", "experience", "skills", "projects", "activities", "education"];
    const observers = [];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the focal area
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
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

  // Helper to construct URLs based on current page
  const getUrl = (href) => {
    if (isHome) return href;
    return `/${href}`;
  };

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md border-b border-border py-2"
          : "py-4"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    className="block px-4 py-2 font-mono text-xs tracking-wider uppercase hover:bg-secondary hover:text-accent-primary transition-colors text-text-muted"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 ml-2 text-text-muted hover:text-accent-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle dark/light mode"
            >
              {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <a
              href={getUrl("#contact")}
              className="px-5 py-2 ml-2 font-mono text-xs tracking-widest uppercase bg-accent-primary/10 text-accent-primary border border-accent-primary/30 rounded hover:bg-accent-primary hover:text-background hover-glow transition-all duration-300"
            >
              Contact
            </a>
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

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-secondary/95 backdrop-blur-lg border-b border-border absolute w-full transition-all duration-300 ${
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
                  isActive ? "text-accent-primary bg-background/50 font-bold border-l-2 border-accent-primary" : "text-text-muted hover:text-accent-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
