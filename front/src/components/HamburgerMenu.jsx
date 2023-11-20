"use client";

import Image from "next/image";
import DropdownMenu from "./DropdownMenu";
import hamburgerIcon from "../assets/hamburgerOpen.svg";
import hamburgerClose from "../assets/hamburgerClose.svg";
import { useState } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="block md:hidden">
      <div>
        <button aria-label="Toggle navigation" onClick={handleNav}>
          <Image
            src={hamburgerIcon}
            width={40}
            height={40}
            alt="Hamburger menu closed"
          />
        </button>
      </div>
      <div
        className={`p-10 text-right z-10 w-[70%] h-full bg-menu duration-300 ease-in-out ${
          nav ? "fixed right-0 top-0" : "fixed right-[-100%] top-0"
        }`}
      >
        <button aria-label="Toggle navigation" onClick={handleNav}>
          <Image
            src={hamburgerClose}
            width={50}
            height={50}
            alt="Hamburger menu open"
          />
        </button>
        <ul className="pt-20 text-2xl">
          <li className="p-3">
            <Link href="/">Home</Link>
          </li>
          <li className="p-3">
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <DropdownMenu />
          </li>
          <li className="p-3">
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
