/**
 * Skills data — edit this file to add / remove / reorder skills.
 *
 * Each category has:
 *   id          – unique key (string)
 *   label       – displayed category heading
 *   description – short subtitle shown beneath the heading
 *   isLearning  – (optional) marks the whole category as "in progress"
 *   skills[]    – array of { name, Icon, color }
 *
 * Icon must be a React component (imported from react-icons or lucide-react).
 * color is the brand hex shown on the icon.
 */

import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiDart,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiTypescript,
  SiDocker,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Layers, Cpu, Lightbulb, Code2, Users, Clock, Zap, Brain } from "lucide-react";

export const skillCategories = [
  {
    id: "languages",
    label: "Programming Languages",
    description: "Core languages in my toolkit",
    skills: [
      { name: "C",          Icon: SiC,          color: "#A8B9CC" },
      { name: "C++",        Icon: SiCplusplus,   color: "#00599C" },
      { name: "Python",     Icon: SiPython,      color: "#3776AB" },
      { name: "Java",       Icon: FaJava,        color: "#5382A1" },
      { name: "JavaScript", Icon: SiJavascript,  color: "#F7DF1E" },
      { name: "Dart",       Icon: SiDart,        color: "#0175C2" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    description: "Technologies I build with",
    skills: [
      { name: "React",       Icon: SiReact,       color: "#61DAFB" },
      { name: "Node.js",     Icon: SiNodedotjs,   color: "#339933" },
      { name: "Express",     Icon: SiExpress,     color: "#888888" },
      { name: "Flutter",     Icon: SiFlutter,     color: "#02569B" },
      { name: "Tailwind CSS",Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Data storage & querying",
    skills: [
      { name: "MongoDB",  Icon: SiMongodb,  color: "#47A248" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
      { name: "MySQL",    Icon: SiMysql,    color: "#4479A1" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    description: "My development environment",
    skills: [
      { name: "Git",    Icon: SiGit,     color: "#F05032" },
      { name: "GitHub", Icon: SiGithub,  color: "#E6EDF3" },
      { name: "VS Code",Icon: VscVscode, color: "#007ACC" },
      { name: "Linux",  Icon: SiLinux,   color: "#FCC624" },
      { name: "Vercel", Icon: SiVercel,  color: "#E6EDF3" },
    ],
  },
  {
    id: "cs",
    label: "Core CS",
    description: "Fundamental principles I apply daily",
    skills: [
      { name: "Data Structures", Icon: Layers,    color: "#06B6D4" },
      { name: "Algorithms",      Icon: Cpu,       color: "#06B6D4" },
      { name: "OOP",             Icon: Code2,     color: "#06B6D4" },
      { name: "Problem Solving", Icon: Lightbulb, color: "#06B6D4" },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    description: "How I work with others",
    skills: [
      { name: "Adaptable",        Icon: Zap,       color: "#06B6D4" },
      { name: "Teamwork",         Icon: Users,     color: "#06B6D4" },
      { name: "Creative Thinker", Icon: Brain,     color: "#06B6D4" },
      { name: "Time Management",  Icon: Clock,     color: "#06B6D4" },
      { name: "Critical Thinking",Icon: Lightbulb, color: "#06B6D4" },
    ],
  },
  {
    id: "learning",
    label: "Currently Learning",
    description: "Expanding my stack right now",
    isLearning: true,
    skills: [
      { name: "TypeScript",  Icon: SiTypescript, color: "#3178C6" },
      { name: "Docker",      Icon: SiDocker,     color: "#2496ED" },
      { name: "TensorFlow",  Icon: SiTensorflow, color: "#FF6F00" },
    ],
  },
];
