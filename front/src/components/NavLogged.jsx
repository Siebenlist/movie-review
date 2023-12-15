"use client";

import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import HamburgerMenu from "./HamburgerMenu";
import searchIcon from "../assets/searchIcon.svg";
import {
  deleteStorageData,
  getStorageData,
} from "@/controllers/localStorageController";

import { userContext } from "@/context/propContext";
import { useContext } from "react";

import { useRouter } from "next/navigation";

const NavLogged = () => {
  const { userLogged, setUserLogged } = useContext(userContext);

  const router = useRouter();

  const handleLogout = () => {
    deleteStorageData();
    setUserLogged({});
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="flex justify-between md:justify-evenly items-center p-7 z-10">
      <a href="/" className="text-4xl font-bold text-logoPrimary">
        Movie<span className="text-logoSecondary">R</span>
      </a>

      <HamburgerMenu logged={true} />

      <ul className="hidden md:flex items-center gap-10 text-lg">
        <li>
          <form>
            <label className="flex gap-2">
              <input
                className="w-40 py-1 px-3 rounded-full bg-input text-white placeholder:text-white"
                type="search"
                placeholder="Search"
              />

              <button type="submit">
                <img className="w-[20px]" src={searchIcon.src} alt="" />
              </button>
            </label>
          </form>
        </li>
        <li>
          <DropdownMenu />
        </li>
        <li>
          <a href={`/profile/${userLogged.user}`}>Profile</a>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavLogged;
