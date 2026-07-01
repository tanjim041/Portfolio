import { useState, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

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
            <a
              href="#"
              className="font-poppins font-bold text-2xl tracking-tighter text-text-main group"
              aria-label={`${portfolioData.personal.name} Portfolio`}
            >
              Tanjim&apos;s{" "}
              <span className="text-accent-primary group-hover:text-glow transition-all duration-300">
                Portfolio
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="nav-link text-sm font-medium text-text-main hover:text-accent-primary transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Education Dropdown */}
            <div className="relative group">
              <a
                href="#education"
                className="nav-link text-sm font-medium text-text-main hover:text-accent-primary transition-colors flex items-center gap-1"
              >
                Education <ChevronDown className="w-4 h-4" />
              </a>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {educationSubLinks.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="block px-4 py-2 text-sm hover:bg-secondary hover:text-accent-primary transition-colors"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="px-5 py-2 bg-accent-primary/10 text-accent-primary border border-accent-primary/30 rounded-full text-sm font-medium hover:bg-accent-primary hover:text-background hover-glow transition-all duration-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="text-text-main hover:text-accent-primary focus:outline-none"
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
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-card hover:text-accent-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
