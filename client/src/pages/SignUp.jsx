import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5 justify-center">
            <h1 className="font-bold text-3xl">{t("sign.sign up")}</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="username"
              >
                {t("sign.username")}
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                type="text"
                id="username"
                onChange={handleChange}
              />
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="email"
              >
                {t("sign.e-mail")}
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                type="text"
                id="email"
                onChange={handleChange}
              />
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                {t("sign.password")}
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <button
                disabled={loading}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 uppercase focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                {loading ? (
                  <div className="flex flex-row gap-2 justify-center">
                    <p>{t("profile.loading")}</p>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce mt-3"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s] mt-3"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s] mt-3"></div>
                  </div>
                ) : (
                  t("sign.sign up")
                )}
              </button>
            </div>
            <OAuth tran={t("sign.continue with google")} />
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            {t("sign.have an account")}
            <a
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              href="/sign-in"
            >
              {t("sign.sign in")}
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4" />
          </div>
        </div>
      </div>
      {error && (
        <div className="flex flex-col gap-2 w-100% sm:w-100% text-[10px] sm:text-xs z-50">
          <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
            <div className="flex gap-2">
              <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white">{t("sign.please try again")}</p>
                <p className="text-gray-500">{error}</p>
              </div>
            </div>
            <button className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
