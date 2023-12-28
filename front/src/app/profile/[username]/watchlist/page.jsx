"use client";

import MoviePoster from "@/components/MoviePoster";
import { useEffect, useState } from "react";
import { getStorageData } from "@/controllers/localStorageController";

const Watchlist = ({ params }) => {
  const userData = JSON.parse(getStorageData());
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistPosters, setWatchlistPosters] = useState([]);

  const fetchWatchlistPosters = async () => {
    const paths = await Promise.all(
      watchlist.map(async (watch) => movieDataFetch(watch.movieId))
    );
    setWatchlistPosters(paths);
  };

  const movieDataFetch = async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmNhYTNjZDBlZmRjODI2ZWRhNWVkNWYyMWZlMDllMiIsInN1YiI6IjYzNmY4YjBiZDdmYmRhMDA5MDVkOTJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0IbstPtIVklqlKXghzWLmq2AGigTFlb2cCWbPEZhf0M",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      const data = await response.json();
      return {
        path: data.poster_path,
        id: data.id,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const getWatchlist = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/watchlist?username=${params.username}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        setWatchlist(data.watchlist);
        console.log("watchlist data", data.watchlist);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  useEffect(() => {
    fetchWatchlistPosters();
  }, [watchlist]);

  return (
    <section className="max-w-[1200px] h-full mx-auto">
      <div className="flex flex-col w-full md:w-[1200px]">
        <div className="w-full">
          <p className="text-slate uppercase">Fav films</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="relative grid grid-cols-3 md:grid-cols-6 auto-rows-max mt-2 place-items-center gap-2 p-5 w-full h-[500px] overflow-y-scroll">
          {watchlist.length === 0 ? (
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-slate">
              You don't have movies for later.
            </p>
          ) : (
            watchlistPosters.map((watchlistItem, index) => (
              <MoviePoster
                key={watchlistItem.id}
                id={watchlist[index].movieId}
                poster={watchlistPosters[index].path}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Watchlist;
