import { useTranslation } from "react-i18next";

export default function About() {
  const [t] = useTranslation("global");
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto dark:bg-slate-800">
      <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
        {t("about.ame")}
      </h1>
      <p className="mb-4 text-slate-700 dark:text-white">{t("about.fp")}</p>
      <p className="mb-4 text-slate-700 dark:text-white">{t("about.sp")}</p>
      <p className="mb-4 text-slate-700 dark:text-white">{t("about.tp")}</p>
      <div className="hidden sm:block">
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
