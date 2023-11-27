"use client";

import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import HamburgerMenu from "./HamburgerMenu";
import { deleteStorageData } from "@/controllers/localStorageController";

import { userContext } from "@/context/propContext";
import { useContext } from "react";

import { useRouter } from "next/navigation";

const NavLogged = () => {
  const { setUserLogged } = useContext(userContext);

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

      <HamburgerMenu />

      <ul className="hidden md:flex items-center gap-10 text-lg">
        <li>
          <DropdownMenu />
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavLogged;
