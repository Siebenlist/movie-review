"use client";
import { useEffect, useState } from "react";
import DropdownItem from "./DropdownItem";
import dropdownArrow from "../assets/dropdownArrow.svg";
import Image from "next/image";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState();

  const handleDropdown = () => {
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const genreFetch = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmNhYTNjZDBlZmRjODI2ZWRhNWVkNWYyMWZlMDllMiIsInN1YiI6IjYzNmY4YjBiZDdmYmRhMDA5MDVkOTJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0IbstPtIVklqlKXghzWLmq2AGigTFlb2cCWbPEZhf0M",
      },
    };

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      if (res.ok) {
        const data = await res.json();
        setMovieGenres(data);
      }
    } catch {
      console.log("error papucho");
    }
  };

  useEffect(() => {
    genreFetch();
  }, []);

  if (!movieGenres)
    return (
      <div className="inline-flex items-center cursor-pointer">
        Movies{" "}
        <Image
          src={dropdownArrow}
          width={20}
          height={20}
          alt="dropdown toggle open"
          className={`duration-200 ${open ? "rotate-90" : "rotate-0"}`}
        />
      </div>
    );

  return (
    <div>
      <div>
        <button
          className="inline-flex items-center cursor-pointer"
          onMouseEnter={handleDropdown}
          onMouseLeave={closeDropdown}
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
        onMouseEnter={handleDropdown}
        onMouseLeave={closeDropdown}
        className={`flex-col flex-wrap h-[400px] bg-slate md:bg-menu text-black md:text-white text-center rounded-md absolute z-40 ${
          open ? "flex" : "hidden"
        }`}
      >
        {movieGenres.genres.map((genre) => {
          return (
            <DropdownItem
              key={genre.id}
              endpoint={genre.id}
              genre={genre.name}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownMenu;
