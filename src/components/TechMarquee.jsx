import { memo } from "react";
import { skillCategories } from "../data/skills";
import { Marquee } from "./Marquee";

const allSkills = skillCategories.flatMap((cat) => cat.skills);
const uniqueSkills = Array.from(new Map(allSkills.map((s) => [s.name, s])).values());

const TechMarquee = memo(function TechMarquee() {
  const renderItem = (skill) => (
    <div className="flex items-center space-x-3 text-text-muted hover:text-text-main transition-colors duration-300">
      {skill.Icon && (
        <skill.Icon
          className="w-5 h-5 opacity-80 group-hover/item:opacity-100"
          style={{ color: skill.color }}
        />
      )}
      <span className="font-mono text-sm tracking-wider uppercase whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );

  const renderSeparator = () => (
    <span className="text-accent-primary/50 font-mono text-sm select-none pl-8" aria-hidden="true">
      //
    </span>
  );

  return (
    <div className="border-y border-border bg-secondary/30 py-3 group">
      <Marquee
        items={uniqueSkills}
        direction="left"
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        prefersStaticFallback={false}
        innerClassName="flex items-center space-x-8 shrink-0 px-4"
        speed={30}
      />
    </div>
  );
});

export default TechMarquee;
