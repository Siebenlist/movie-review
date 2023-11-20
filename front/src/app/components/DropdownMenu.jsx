"use client";
import { useState } from "react";
import DropdownItem from "./DropdownItem";
import dropdownArrow from "../assets/dropdownArrow.svg";
import Image from "next/image";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);

  const handleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <button
          className="inline-flex items-center py-2 px-4 cursor-pointer"
          onClick={handleDropdown}
        >
          Movies
          <Image
            src={dropdownArrow}
            width={20}
            height={20}
            alt="dropdown toggle open"
            className={`duration-200 ${open ? "rotate-90" : "rotate-0"}`}
          />
        </button>
      </div>
      <ul
        className={`bg-menu text-white text-center rounded-md ${
          open ? "block md:absolute" : "hidden"
        }`}
      >
        <DropdownItem href={"#"} genre={"Horror"} />
        <DropdownItem href={"#"} genre={"Comedy"} />
        <DropdownItem href={"#"} genre={"Thriller"} />
        <DropdownItem href={"#"} genre={"Drama"} />
        <DropdownItem href={"#"} genre={"Sci-fi"} />
      </ul>
    </div>
  );
};

export default DropdownMenu;
