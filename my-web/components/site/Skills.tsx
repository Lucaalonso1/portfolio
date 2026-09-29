import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiFigma,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

const SKILLS: { name: string; level: number; Icon: IconType; color: string }[] = [
  { name: "JavaScript", level: 95, Icon: SiJavascript, color: "#facc15" },
  { name: "React", level: 95, Icon: FaReact, color: "#38bdf8" },
  { name: "TypeScript", level: 90, Icon: SiTypescript, color: "#60a5fa" },
  { name: "Next.js", level: 90, Icon: SiNextdotjs, color: "#efece4" },
  { name: "Python", level: 90, Icon: FaPython, color: "#60a5fa" },
  { name: "Tailwind CSS", level: 90, Icon: SiTailwindcss, color: "#22d3ee" },
  { name: "Node.js", level: 85, Icon: FaNodeJs, color: "#4ade80" },
  { name: "Figma", level: 85, Icon: SiFigma, color: "#f472b6" },
  { name: "MongoDB", level: 80, Icon: SiMongodb, color: "#4ade80" },
  { name: "Framer Motion", level: 80, Icon: SiFramer, color: "#e879f9" },
  { name: "Vercel", level: 80, Icon: SiVercel, color: "#efece4" },
];

export function Skills() {
  const { t } = useTranslation("common");

  return (
    <section id="skills" className="px-4 py-8 md:px-8 md:py-10">
      <div className="glass mx-auto max-w-6xl rounded-[32px] p-8 md:p-12">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-white/60">{t("skills.kicker")}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
              {t("skills.title")}
            </h2>
          </div>
          <p className="max-w-sm text-white/70 md:text-right">{t("skills.subtitle")}</p>
        </div>

        <div className="grid gap-x-16 md:grid-cols-2">
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className="border-b border-white/10 py-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <skill.Icon size={16} color={skill.color} aria-hidden />
                  <span className="text-base tracking-tight">{skill.name}</span>
                </div>
                <span className="text-sm text-white/50">{skill.level}</span>
              </div>
              <div className="h-px bg-white/15">
                <motion.div
                  className="h-px origin-left bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.05, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-60px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
