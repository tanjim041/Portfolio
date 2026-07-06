import { memo } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaDiscord,
  FaWhatsapp,
} from "react-icons/fa";
import { SiGmail, SiCodeforces } from "react-icons/si";
import { Mail } from "lucide-react";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  discord: FaDiscord,
  email: Mail,
  gmail: SiGmail,
  codeforces: SiCodeforces,
  whatsapp: FaWhatsapp,
};

const SocialIcon = memo(function SocialIcon({ platform, link, icon, variant = "inline" }) {
  const IconComponent = iconMap[icon] || FaGithub;

  if (variant === "circle") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:bg-accent-primary hover:text-background hover:border-accent-primary hover-glow transition-all duration-300"
        aria-label={platform}
      >
        <IconComponent className="w-5 h-5" />
        <span className="sr-only">{platform}</span>
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-muted hover:text-accent-primary transition-colors hover:-translate-y-1 transform duration-300"
      aria-label={platform}
    >
      <IconComponent className="w-6 h-6" />
      <span className="sr-only">{platform}</span>
    </a>
  );
});

export default SocialIcon;
