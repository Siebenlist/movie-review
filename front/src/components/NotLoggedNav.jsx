import HamburgerMenu from "./HamburgerMenu";
import DropdownMenu from "./DropdownMenu";
import searchIcon from "../assets/searchIcon.svg";
import Link from "next/link";
import Searchbar from "./Searchbar";

const NotLoggedNav = () => {
  return (
    <nav className="flex justify-between md:justify-evenly items-center p-7 z-10">
      <a href="/" className="text-4xl font-bold text-logoPrimary">
        Movie<span className="text-logoSecondary">R</span>
      </a>

      <HamburgerMenu logged={false} />

      <div className="hidden md:flex items-center gap-5">
        <DropdownMenu />
        <Searchbar />
        <Link
          href="/login"
          className="py-1 px-6 bg-button hover:bg-buttonHover duration-200 font-bold rounded-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NotLoggedNav;
