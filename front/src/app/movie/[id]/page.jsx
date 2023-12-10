"use client";
import reviewStar from "@/assets/reviewStar.svg";
import MovieActions from "@/components/MovieActions";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/data/reviews";
import { useState, useEffect } from "react";

const MoviePage = ({ params }) => {
  const [movieData, setMovieData] = useState(null);

  //Esta funcion fetchea la pelicula que se haya buscado y devuelve los detalles
  const fetcheo = async (id) => {
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
      setMovieData(data); // Almacena los datos en el estado
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetcheo(params.id);
  }, [params.id]);

  if (!movieData) return <div>Loading...</div>;

  return (
    <section className="flex flex-col justify-center items-start mt-10 md:mb-[150px] p-3 mx-auto min-h-screen max-w-[1200px]">
      <div className="flex flex-col justify-center items-start md:flex-row mb-5 md:mb-[150px]">
        <div className="w-full flex flex-col justify-center items-center mb-10 gap-5">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            className="w-[150px] md:w-[200px] border border-gray p-[1px] rounded-sm"
          />
          <p>
            Average rating:{" "}
            <span className="inline-flex items-center">
              4.3/5{" "}
              <img
                src={reviewStar.src}
                alt="Review star"
                className="w-[15px]"
              />
            </span>
          </p>
          <MovieActions movieId={params.id} />
        </div>
        <article className="p-3 w-full">
          <h1 className="text-xl md:text-4xl font-bold mb-5">
            {movieData.original_title}{" "}
            <span className="text-gray text-2xl">
              ({movieData.release_date.split("-")[0]})
            </span>
          </h1>
          <p className="break-words mb-5 w-full">{movieData.overview}</p>
        </article>
      </div>
      <div>
        <div className="max-w-[1200px]">
          <p className="text-slate uppercase">Popular reviews</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="divide-y-2 divide-slate divide-opacity-50">
          {reviews.map((review) => {
            return (
              <ReviewCard
                id={review.id}
                movie={review.movie}
                pfp={review.pfp}
                poster={review.poster}
                rating={review.rating}
                review={review.review}
                user={review.user}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
