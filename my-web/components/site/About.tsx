import { useTranslation } from "next-i18next";

export function About() {
  const { t } = useTranslation("common");

  const facts = [
    { label: t("about.educationLabel"), value: t("about.educationValue") },
    { label: t("about.baseLabel"), value: t("about.baseValue") },
    { label: t("about.stackLabel"), value: t("about.stackValue") },
    { label: t("about.placeLabel"), value: t("about.placeValue") },
  ];

  return (
    <section id="about" className="px-4 py-16 md:px-8 md:py-28">
      <div className="glass mx-auto grid max-w-6xl gap-8 rounded-[24px] p-5 sm:rounded-[32px] sm:p-8 md:gap-12 md:p-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="text-sm font-medium text-white/60">{t("about.kicker")}</p>
          <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <p className="max-w-3xl text-lg leading-snug text-white/90 sm:text-xl md:text-2xl md:leading-snug">
            {t("hero.description")}
          </p>
          <dl className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl bg-white/10 px-4 py-5 sm:px-5 sm:py-6">
                <dt className="text-xs font-medium text-white/55">{fact.label}</dt>
                <dd className="mt-2 text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
