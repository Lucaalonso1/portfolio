import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslation } from "next-i18next";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/components/site/links";

type Project = {
  title: string;
  role: string;
  description: string;
  tech: string[];
  media: string;
  kind: "video" | "image";
  href?: string;
};

function useIsDesktop() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return matches;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function ProjectSlide({
  project,
  index,
  total,
  progress,
  desktop,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  desktop: boolean;
}) {
  const { t } = useTranslation("common");
  const start = index / total;
  const end = (index + 1) / total;
  const mediaX = useTransform(progress, [start, end], ["5%", "-5%"]);

  return (
    <article className="flex w-full shrink-0 items-center px-3 py-14 sm:px-4 sm:py-20 md:px-8 lg:h-screen lg:w-screen lg:px-10 lg:py-8">
      <div className="glass flex w-full flex-col justify-center gap-6 rounded-[24px] p-5 sm:gap-8 sm:rounded-[32px] sm:p-6 md:p-10 lg:h-[calc(100vh-5.5rem)] lg:gap-8">
      <div className="flex items-center justify-between text-xs font-medium text-white/60">
        <span>{t("projects.kicker")}</span>
        <span>
          <span className="text-white">{pad(index + 1)}</span>
          <span> / {pad(total)}</span>
        </span>
      </div>

      <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-sm font-medium text-white/60">{project.role}</p>
          <h3 className="mt-2 text-[clamp(2rem,8vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75 sm:mt-5 sm:text-base md:text-lg">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-7">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white"
              >
                <span className="border-b border-white/50 pb-0.5 transition-colors group-hover:border-white">
                  {t("projects.visitWebsite")}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <div className="max-w-sm">
                <p className="text-sm font-medium text-white">{t("projects.archived")}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{t("projects.archivedNote")}</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative h-[38vh] overflow-hidden rounded-3xl border border-white/15 bg-black/20 lg:h-[52vh]">
          {project.kind === "video" ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={project.media} type="video/mp4" />
            </video>
          ) : (
            <motion.div
              style={desktop ? { x: mediaX } : undefined}
              className="absolute inset-[-6%] "
            >
              <Image
                src={project.media}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          )}
        </div>
      </div>
      </div>
    </article>
  );
}

export function Work() {
  const { t } = useTranslation("common");
  const desktop = useIsDesktop();
  const pinRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  const projects: Project[] = [
    {
      title: t("projects.7indoorgolf.title"),
      role: t("projects.7indoorgolf.role"),
      description: t("projects.7indoorgolf.description"),
      tech: ["Next.js", "React", "Tailwind", "Booking"],
      media: "/7indoorgolf.mp4",
      kind: "video",
    },
    {
      title: t("projects.ownstar.title"),
      role: t("projects.ownstar.role"),
      description: t("projects.ownstar.description"),
      tech: ["Next.js", "React", "Tailwind", "Motion"],
      media: "/ownstar-web.png",
      kind: "image",
      href: LINKS.ownstar,
    },
    {
      title: t("projects.etg.title"),
      role: t("projects.etg.role"),
      description: t("projects.etg.description"),
      tech: ["React", "Motion", "SEO", "Responsive"],
      media: "/etg.jpg",
      kind: "image",
      href: LINKS.etg,
    },
  ];

  return (
    <section
      id="work"
      ref={pinRef}
      className="work-pin relative h-auto lg:h-[calc(100vh+200vw)]"
    >
      <div className="work-sticky relative lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <motion.div
          style={desktop ? { x } : undefined}
          className="work-track flex w-full flex-col lg:w-max lg:flex-row"
        >
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              desktop={desktop}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-14 bottom-7 hidden lg:block">
          <div className="h-px bg-white/10">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
