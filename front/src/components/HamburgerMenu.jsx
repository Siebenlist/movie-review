"use client";

import Image from "next/image";
import DropdownMenu from "./DropdownMenu";
import hamburgerIcon from "../assets/hamburgerOpen.svg";
import hamburgerClose from "../assets/hamburgerClose.svg";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteStorageData } from "@/controllers/localStorageController";
import { userContext } from "@/context/propContext";
import { useContext } from "react";
import Link from "next/link";

const HamburgerMenu = ({ logged }) => {
  const [nav, setNav] = useState(false);
  const { setUserLogged } = useContext(userContext);

  const router = useRouter();

  const handleLogout = () => {
    deleteStorageData();
    setUserLogged({});
    router.push("/");
    router.refresh();
  };

  function handleNav() {
    setNav(!nav);
  }

  if (!logged)
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
          <div className="flex flex-col items-end gap-5 mt-10">
            <DropdownMenu />
            <form className="flex gap-2">
              <label className="flex gap-2">
                <input
                  className="w-40 py-1 px-3 rounded-full bg-input text-white placeholder:text-white"
                  type="search"
                  name=""
                  id=""
                  placeholder="Search"
                />

                <button type="submit">
                  <img className="w-[20px]" src={searchIcon.src} alt="" />
                </button>
              </label>
            </form>
            <Link
              onClick={handleNav}
              href="/login"
              className="w-full py-2 text-center rounded-full bg-button hover:bg-buttonHover duration-200 font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );

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
          <li>
            <form className="flex gap-2">
              <input
                className="w-40 py-1 px-3 rounded-full bg-input text-white placeholder:text-white"
                type="search"
                name=""
                id=""
                placeholder="Search"
              />

              <button type="submit">
                <img className="w-[20px]" src={searchIcon.src} alt="" />
              </button>
            </form>
          </li>
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
