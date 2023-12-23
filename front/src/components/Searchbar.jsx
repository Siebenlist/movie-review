"use client";

import React, { useEffect } from "react";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (term) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer tu_token_de_autorizacion",
      },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`,
        options
      );
      if (res.ok) {
        console.log("bien search");
        const data = await res.json();
        console.log("data", data);

        const limitedResults = data.results.slice(0, 5);
        setSearchData(limitedResults);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search === searchTerm) {
        console.log("Usuario ha terminado de escribir. Realizando búsqueda...");
        handleSearch(search);
      }
    }, 500);

    return () => {
      console.log("Limpiando temporizador");
      clearTimeout(delayDebounceFn);
    };
  }, [search, searchTerm]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <form>
        <label>
          <input
            className="w-40 py-1 px-3 rounded-full bg-input text-white placeholder:text-white"
            type="search"
            placeholder="Search"
            onChange={handleChange}
          />
        </label>
      </form>

      <ul className="flex flex-col gap-3 w-[300px] bg-input absolute">
        {searchData.map((data) => {
          return (
            <li key={data.id} className="p-3">
              <Link className="flex gap-2" href={`/movie/${data.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  alt={`${data.original_title} Poster`}
                  width={100}
                  height={100}
                  className="w-[50px]"
                />
                <div className="w-full">
                  <p className="font-bold">{data.original_title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Searchbar;
