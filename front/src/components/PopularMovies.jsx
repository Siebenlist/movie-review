import React from "react";
import useSWR from "swr";
import MoviePoster from "./MoviePoster";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

async function fetcher(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

const PopularMovies = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    rubberband: false,
    mode: "snap",
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 3.1, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4.1, spacing: 10 },
      },
    },
    slides: { perView: 2 },
  });

  const { data, error } = useSWR(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    fetcher
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={sliderRef}
      className="keen-slider w-[500px] my-10 animate-fade-in"
    >
      {
        //Mapeo del array de peliculas
        data.results.map((movie) => {
          return (
            <MoviePoster
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              id={movie.id}
              carousel
            />
          );
        })
      }
    </div>
  );
};

export default PopularMovies;
