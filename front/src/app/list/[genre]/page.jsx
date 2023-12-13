"use client";

import MoviePoster from "@/components/MoviePoster";
import { useEffect, useState } from "react";

const ListPage = ({ params }) => {
  const [movies, setMovies] = useState();

  const handleMovies = async (genre) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmNhYTNjZDBlZmRjODI2ZWRhNWVkNWYyMWZlMDllMiIsInN1YiI6IjYzNmY4YjBiZDdmYmRhMDA5MDVkOTJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0IbstPtIVklqlKXghzWLmq2AGigTFlb2cCWbPEZhf0M",
      },
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`,
        options
      );

      if (res.ok) {
        console.log("fetcheo god");
        const data = await res.json();
        console.log(data);
        setMovies(data);
      }
    } catch {
      console.log("error pa");
    }
  };

  useEffect(() => {
    handleMovies(params.genre);
  }, [params.genre]);

  if (!movies) return <div>Loading...</div>;

  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="w-full">
        <p className="text-slate uppercase">Peliculas</p>
        <div className="max-w-full h-[1px] bg-gray"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {movies.results.map((movie) => {
          return (
            <MoviePoster
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ListPage;
