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
  const start = index / Math.max(total - 1, 1);
  const end = (index + 1) / Math.max(total - 1, 1);
  const mediaX = useTransform(progress, [start, end], ["3%", "-3%"]);

  return (
    <article className="flex w-full shrink-0 items-center px-3 py-8 sm:px-4 sm:py-12 lg:h-screen lg:w-[50vw] lg:px-3 lg:py-8 xl:px-4">
      <div className="glass flex w-full flex-col gap-4 rounded-[24px] p-4 sm:gap-5 sm:rounded-[28px] sm:p-5 lg:h-[calc(100vh-5.5rem)] lg:min-h-0 lg:p-6">
        <div className="flex shrink-0 items-center justify-between text-xs font-medium text-white/60">
          <span>{t("projects.kicker")}</span>
          <span>
            <span className="text-white">{pad(index + 1)}</span>
            <span> / {pad(total)}</span>
          </span>
        </div>

        <div className="relative h-[30vh] shrink-0 overflow-hidden rounded-[20px] border border-white/15 bg-black/20 sm:h-[34vh] lg:h-auto lg:min-h-0 lg:flex-1">
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
              className="absolute inset-[-4%]"
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

        <div className="shrink-0">
          <p className="text-sm font-medium text-white/60">{project.role}</p>
          <h3 className="mt-1 text-[clamp(1.75rem,2.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75 sm:text-[15px]">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-3.5">
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
                <p className="mt-1 text-sm leading-relaxed text-white/65">{t("projects.archivedNote")}</p>
              </div>
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

  const projects: Project[] = [
    {
      title: t("projects.santoCarWash.title"),
      role: t("projects.santoCarWash.role"),
      description: t("projects.santoCarWash.description"),
      tech: ["Next.js", "React", "Tailwind", "Motion"],
      media: "/santo-car-wash.mp4",
      kind: "video",
      href: LINKS.santoCarWash,
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
      title: t("projects.tuttos.title"),
      role: t("projects.tuttos.role"),
      description: t("projects.tuttos.description"),
      tech: ["Next.js", "React", "Tailwind", "Motion"],
      media: "/tuttos.jpg",
      kind: "image",
      href: LINKS.tuttos,
    },
    {
      title: t("projects.7indoorgolf.title"),
      role: t("projects.7indoorgolf.role"),
      description: t("projects.7indoorgolf.description"),
      tech: ["Next.js", "React", "Tailwind", "Booking"],
      media: "/7indoorgolf.mp4",
      kind: "video",
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

  const steps = Math.max(projects.length - 2, 0);
  const travelVw = steps * 50;
  const scrollVh = steps * 58;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travelVw}vw`]);

  return (
    <section
      id="work"
      ref={pinRef}
      style={{ ["--work-scroll" as string]: `${scrollVh}vh` }}
      className="work-pin relative h-auto lg:h-[calc(100vh+var(--work-scroll))]"
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
