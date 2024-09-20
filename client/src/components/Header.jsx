import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import icon_g from "/mke-logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion.js";

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
    <header className="bg-slate-200 sm:shadow-md ">
      <div className="flex flex-nowrap items-center">
        <div className="flex gap-0 sm:gap-52 justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <motion.h1
              variants={slideIn("left", "spring", 0.4, 0.9)}
              initial={{ x: "-230%" }}
              animate="show"
              className="font-bold text-sm sm:text-xl flex flex-wrap items-center gap-2"
            >
              <img src={icon_g} className="w-[50px] h-[50px]" alt="" />
              <div>
                <span className="text-slate-500">Mekelle</span>
                <span className="text-slate-700">Estate</span>
              </div>
            </motion.h1>
          </Link>
          <motion.form
            variants={slideIn("down", "spring", 0.4, 0.9)}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
          >
            <TextInput
              type="text"
              placeholder={t("header.search")}
              rightIcon={AiOutlineSearch}
              className="hidden lg:inline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.form>
          <motion.ul
            variants={slideIn("right", "spring", 0.4, 0.9)}
            initial={{ x: "230%" }}
            animate="show"
            className="flex gap-4 items-center"
          >
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
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700 hover:underline">
                  {t("header.sign in")}
                </li>
              )}
            </Link>
          </motion.ul>
        </div>
        <motion.div
          initial={{ x: "240%", y: "55%" }}
          animate={{
            x: "0",
            y: "0",
            transition: {
              type: "spring",
              delay: "0.4",
              duration: "right",
              ease: "easeOut",
            },
          }}
          className="mb-6 mr-2"
        >
          <Select
            onClick={handleChangeLanguage}
            className="p-0 h-[20px] w-[75px] text-xs"
          >
            <option value={"en"}>En</option>
            <option value={"tig"}>ትግ</option>
          </Select>
        </motion.div>
      </div>
    </header>
  );
}
