import HamburgerMenu from "./HamburgerMenu";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";

const NotLoggedNav = () => {
  return (
    <nav className="flex justify-between md:justify-evenly items-center p-7 z-10">
      <a href="/" className="text-4xl font-bold text-logoPrimary">
        Movie<span className="text-logoSecondary">R</span>
      </a>

      <div className="flex items-center gap-5">
        <DropdownMenu />
        <form action="">
          <input
            className="w-40 py-1 px-3 rounded-full bg-input text-white placeholder:text-white"
            type="search"
            name=""
            id=""
            placeholder="Search"
          />
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
