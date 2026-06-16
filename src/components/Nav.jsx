import { useState } from "react";
import { headerLogo } from "../assets/images/index.js";
import { hamburger } from "../assets/icons/index.js";
import { navLinks } from "../constants/index.js";
import MobileMenu from "./MobileMenu";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">

        {/* Logo */}
        <a href="/">
          <img
            src={headerLogo}
            alt="Logo"
            width={130}
            height={40}
          />
        </a>

        {/* Desktop Links */}
        <ul className="flex flex-1 justify-end items-center gap-16 max-lg:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-montserrat text-lg text-slate-gray hover:text-coral-red"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div
          className="hidden bg-gray-500 max-lg:block cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img src={hamburger} alt="menu" width={25} height={25} />
        </div>

      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
      />
    </header>
  );
};

export default Nav;