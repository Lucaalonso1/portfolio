import { useState, type ChangeEvent, type FormEvent } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SiteNav } from "@/components/site/SiteNav";
import { LINKS } from "@/components/site/links";

export default function Contact() {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_45r88ri",
        "template_9mac6pq",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "ANZFSwUsZ_7KJ7DAd"
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/60";

  return (
    <>
      <Head>
        <title>{`${t("navigation.contact")} — Luca Alonso`}</title>
        <meta name="description" content={t("contact.subtitle")} />
      </Head>
      <SiteNav />
      <main className="min-h-screen px-4 pb-24 pt-28 md:px-8">
        <div className="glass mx-auto max-w-5xl rounded-[32px] p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-white/60">{t("cta.kicker")}</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {t("contact.title")}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:col-span-4"
            >
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-block text-lg text-white underline decoration-white/40 underline-offset-4"
              >
                {LINKS.email}
              </a>
              <div className="mt-6 flex gap-6 text-sm text-white/65">
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  GitHub
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-8 lg:col-span-8"
            >
            <div className="grid gap-8 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-white/60">
                  {t("contact.form.name")}
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.namePlaceholder")}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-white/60">
                  {t("contact.form.email")}
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.emailPlaceholder")}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-medium text-white/60">
                {t("contact.form.subject")}
              </span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t("contact.form.subjectPlaceholder")}
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-medium text-white/60">
                {t("contact.form.message")}
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder={t("contact.form.messagePlaceholder")}
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
              </button>
              {submitStatus === "success" && (
                <p className="text-sm text-white">{t("contact.form.success")}</p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-red-400">{t("contact.form.error")}</p>
              )}
            </div>
          </motion.form>
        </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
  };
};
