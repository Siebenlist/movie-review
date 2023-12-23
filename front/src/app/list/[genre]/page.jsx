"use client";

import MoviePoster from "@/components/MoviePoster";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListPage = ({ params }) => {
  const [movies, setMovies] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

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
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${pageNumber}`,
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

  const handleNextPage = () => {
    setPageNumber((oldVal) => oldVal + 1);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber((oldVal) => oldVal - 1);
  };

  useEffect(() => {
    handleMovies(params.genre);
  }, [params.genre, pageNumber]);

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
      <div className="flex justify-center items-center gap-5 my-10 font-bold ">
        <div>
          <button onClick={() => handlePrevPage()}>Anterior</button>
        </div>
        <div>
          <p>{pageNumber}</p>
        </div>
        <div>
          <button onClick={() => handleNextPage()}>Siguiente</button>
        </div>
      </div>
    </section>
  );
};

export default ListPage;
