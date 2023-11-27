import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import HamburgerMenu from "./HamburgerMenu";

const NavLogged = () => {
  return (
    <nav className="flex justify-between md:justify-evenly items-center p-7 z-10">
      <a href="/" className="text-4xl font-bold">
        MovieR
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
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLogged;
