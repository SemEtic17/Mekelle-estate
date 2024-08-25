import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import icon_g from "../assets/icon-g.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleChangeLanguage = (e) => {
    if (e.target.value === "en") {
      i18n.changeLanguage("en");
    }
    if (e.target.value === "tig") {
      i18n.changeLanguage("tig");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex flex-nowrap items-center">
        {/* <img src={icon_g} className='w-[190px] h-[50px] mt-3' alt="" /> */}
        <div className="flex gap-0 sm:gap-52 justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">{t("header.mekelle")}</span>
              <span className="text-slate-700">{t("header.estate")}</span>
            </h1>
          </Link>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder={t("header.search")}
              rightIcon={AiOutlineSearch}
              className="hidden lg:inline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                {t("header.link_home")}
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                {t("header.link_about")}
              </li>
            </Link>
            {/* <DarkThemeToggle /> */}
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700 hover:underline">
                  {t("header.sign in")}
                </li>
              )}
            </Link>
          </ul>
        </div>
        <div>
          <Select
            onClick={handleChangeLanguage}
            className="p-0 h-[20px] w-[75px] text-xs"
          >
            <option value={"en"}>En</option>
            <option value={"tig"}>ትግ</option>
          </Select>
        </div>
      </div>
    </header>
  );
}
