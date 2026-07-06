import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SocialIcon from "../components/SocialIcon";
import useScrollPosition from "../hooks/useScrollPosition";
import portfolioData from "../data/portfolio";

export default function Footer() {
  const { socials } = portfolioData;
  const scrollY = useScrollPosition();
  const showBackToTop = scrollY > 500;
  const [discordCopied, setDiscordCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyDiscordUsername = async () => {
    try {
      await navigator.clipboard.writeText("tanjim433");
      setDiscordCopied(true);
      window.clearTimeout(copyDiscordUsername.timeoutId);
      copyDiscordUsername.timeoutId = window.setTimeout(() => {
        setDiscordCopied(false);
      }, 2200);
    } catch {
      setDiscordCopied(true);
      window.clearTimeout(copyDiscordUsername.timeoutId);
      copyDiscordUsername.timeoutId = window.setTimeout(() => {
        setDiscordCopied(false);
      }, 2200);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-background border-t border-border py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative">
        {/* Footer heading — matches section title typography */}
        <div className="mb-10 text-center">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-text-main">
            <span className="text-white">Let&apos;s </span>
            <span className="text-accent-primary">Connect</span>
          </h2>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div
            className={`absolute -top-14 left-1/2 -translate-x-1/2 rounded-full border border-accent-primary/30 bg-card px-4 py-2 text-xs font-medium text-accent-primary shadow-lg transition-all duration-300 ${
              discordCopied
                ? "opacity-100 visible translate-y-0"
                : "pointer-events-none opacity-0 invisible translate-y-2"
            }`}
            role="status"
            aria-live="polite"
          >
            Discord username copied! Add me: tanjim433
          </div>
          {socials.map((social) => (
            <SocialIcon
              key={social.platform}
              platform={social.platform}
              link={social.link}
              icon={social.icon}
              variant="circle"
            />
          ))}

          {/* Gmail */}
          <a
            href="mailto:islamtanjim316@gmail.com"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:bg-accent-primary hover:text-background hover:border-accent-primary hover-glow transition-all duration-300"
            aria-label="Send email via Gmail"
            title="Email me"
          >
            <SiGmail className="w-5 h-5" />
            <span className="sr-only">Gmail</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801571270640"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:bg-accent-primary hover:text-background hover:border-accent-primary hover-glow transition-all duration-300"
            aria-label="Chat on WhatsApp"
            title="WhatsApp me"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span className="sr-only">WhatsApp</span>
          </a>

          {/* Discord */}
          <button
            type="button"
            onClick={copyDiscordUsername}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:bg-accent-primary hover:text-background hover:border-accent-primary hover-glow transition-all duration-300"
            aria-label="Discord Username"
            title="Copy Discord username"
          >
            <FaDiscord className="w-5 h-5" />
            <span className="sr-only">Discord</span>
          </button>
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-sm text-center">
          &copy; {new Date().getFullYear()} Md. Tanjimul Islam.
          <br className="sm:hidden" /> All Rights Reserved.
        </p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-accent-primary text-background rounded-full shadow-lg flex items-center justify-center hover:bg-accent-secondary hover:-translate-y-2 hover-glow transition-all duration-300 z-50 ${
          showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
