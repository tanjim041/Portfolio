import { memo } from "react";
import { Award, Calendar } from "lucide-react";

const AchievementCard = memo(function AchievementCard({ achievement }) {
  const { title, desc, date } = achievement;

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 flex gap-4 hover:border-accent-primary/30 transition-all duration-300 relative overflow-hidden group">
      <div className="p-3 bg-secondary rounded-xl text-accent-primary border border-border flex-shrink-0 self-start">
        <Award className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </div>

      <div className="flex-1 text-left">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-poppins text-lg font-bold text-text-main group-hover:text-accent-primary transition-colors">
            {title}
          </h4>
          <span className="flex items-center gap-1 text-xs text-text-muted bg-secondary px-2.5 py-1 rounded-full border border-border">
            <Calendar className="w-3.5 h-3.5" /> {date}
          </span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
});

export default AchievementCard;
