import { memo } from "react";
import { User, Hash, Globe, Trophy, Shield, Calendar, Target, Swords, Users, Gamepad2 } from "lucide-react";

const getIcon = (iconName) => {
  switch (iconName?.toLowerCase()) {
    case "user": return User;
    case "hash": return Hash;
    case "globe": return Globe;
    case "trophy": return Trophy;
    case "shield": return Shield;
    case "calendar": return Calendar;
    case "target": return Target;
    case "swords": return Swords;
    case "users": return Users;
    default: return Gamepad2;
  }
};

const PlayerProfile = memo(function PlayerProfile({ profile }) {
  if (!profile || !Array.isArray(profile)) return null;

  // Filter out any entries that don't have a label or a value
  const activeItems = profile.filter((item) => item.label && item.value);

  if (activeItems.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent-primary/30 transition-all duration-300">
      <h3 className="font-poppins text-2xl font-bold text-text-main mb-6 border-b border-border/50 pb-4">
        Player Profile
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activeItems.map((item) => {
          const IconComponent = getIcon(item.icon);
          return (
            <div
              key={item.label}
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border/40 hover:border-accent-secondary/20 transition-all duration-200"
            >
              <div className="p-2.5 rounded-lg bg-background text-accent-secondary border border-border">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <span className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span
                  className={`font-semibold text-sm sm:text-base truncate block ${
                    item.highlight ? "text-accent-primary font-bold" : "text-text-main"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default PlayerProfile;
