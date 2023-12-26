"use client";

import DropdownMenu from "./DropdownMenu";
import HamburgerMenu from "./HamburgerMenu";

import Searchbar from "./Searchbar";
import { deleteStorageData } from "@/controllers/localStorageController";

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
          <Searchbar />
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
