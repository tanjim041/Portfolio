import { memo } from "react";
import { FaDiscord, FaYoutube, FaTwitch, FaFacebook, FaLink } from "react-icons/fa";

const SocialLinks = memo(function SocialLinks({ socialLinks }) {
  if (!socialLinks) return null;

  const { profileUrl, discord, youtube, twitch, facebook } = socialLinks;

  const links = [
    { label: "Game Profile", url: profileUrl, icon: FaLink, color: "hover:text-accent-primary" },
    { label: "Discord", url: discord ? `https://discord.com` : null, icon: FaDiscord, color: "hover:text-[#5865F2]" },
    { label: "YouTube", url: youtube, icon: FaYoutube, color: "hover:text-[#FF0000]" },
    { label: "Twitch", url: twitch, icon: FaTwitch, color: "hover:text-[#9146FF]" },
    { label: "Facebook Gaming", url: facebook, icon: FaFacebook, color: "hover:text-[#1877F2]" },
  ].filter((item) => item.url);

  if (links.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent-primary/30 transition-all duration-300">
      <h3 className="font-poppins text-2xl font-bold text-text-main mb-6 border-b border-border/50 pb-4">
        Gaming Socials & Links
      </h3>

      <div className="flex flex-wrap gap-4 justify-start">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary border border-border text-text-muted hover:border-border/80 hover:bg-background transition-all duration-300 ${link.color}`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-semibold text-sm">{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
});

export default SocialLinks;
