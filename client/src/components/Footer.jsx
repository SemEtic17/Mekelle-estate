import { Footer } from "flowbite-react";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPortrait } from "react-icons/fa";

export default function Foot() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Mekelle-estate"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center items-center">
            <div className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white text-gray-600">
              Contact Creator
            </div>
            <p className="text-gray-600 dark:text-white font-bold">Sem Dori</p>
            <Footer.Icon
              href="https://github.com/SemEtic17"
              rel="noreferrer"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon
              href="mailto:semetic17@gmail.com"
              rel="noreferrer"
              target="_blank"
              icon={MdEmail}
            />
            <Footer.Icon
              href="https://semetic17.github.io/Sem-portfolio/"
              rel="noreferrer"
              target="_blank"
              icon={FaPortrait}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
