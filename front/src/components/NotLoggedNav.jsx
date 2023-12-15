import HamburgerMenu from "./HamburgerMenu";
import DropdownMenu from "./DropdownMenu";
import searchIcon from "../assets/searchIcon.svg";
import Link from "next/link";

const NotLoggedNav = () => {
  return (
    <nav className="flex justify-between md:justify-evenly items-center p-7 z-10">
      <a href="/" className="text-4xl font-bold text-logoPrimary">
        Movie<span className="text-logoSecondary">R</span>
      </a>

      <HamburgerMenu logged={false} />

      <div className="hidden md:flex items-center gap-5">
        <DropdownMenu />
        <form className="flex gap-2">
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
