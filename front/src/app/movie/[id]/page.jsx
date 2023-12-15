"use client";

//TODO: HACER MAS LINDO EL COSO DE LA REVIEW PORQUE HAORA ESUNA CAGADA

import MovieActions from "@/components/MovieActions";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/data/reviews";
import { useState, useEffect } from "react";
import { getStorageData } from "@/controllers/localStorageController";

const MoviePage = ({ params }) => {
  const [movieData, setMovieData] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const userData = JSON.parse(getStorageData());

  //Esta funcion fetchea la pelicula que se haya buscado y devuelve los detalles
  const fetcheo = async () => {
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
        `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
        options
      );
      const data = await response.json();
      setMovieData(data); // Almacena los datos en el estado
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieReviews = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getListReviewMovie?movieId=${params.id}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        setMovieReviews(data.reviews);
      }
    } catch {
      console.log("Mal get reviews");
    }
  };

  useEffect(() => {
    fetcheo();
    getMovieReviews();
  }, []);

  if (!movieData) return <div>Loading...</div>;

  return (
    <section className="flex flex-col justify-center items-start mt-10 md:mb-[150px] p-3 mx-auto min-h-fit max-w-[1200px]">
      <div className="flex flex-col justify-center items-start md:flex-row mb-5 md:mb-[150px]">
        <div className="w-full md:w-[30%] flex flex-col justify-center items-center mb-10 gap-5">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            className="w-[150px] md:w-[200px] border border-gray p-[1px] rounded-sm"
            alt={"poster"}
          />
          <MovieActions />
        </div>
        <article className="p-3 w-full md:w-[70%]">
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
          <p className="text-slate uppercase">Reviews for this movie</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="divide-y-2 divide-slate divide-opacity-50">
          {movieReviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                review={review.review}
                poster={movieData.poster_path}
                rating={review.rating.rating}
                user={review.user.username}
                pfp={
                  "https://hips.hearstapps.com/hmg-prod/images/dl-u525201-016-1673780958.jpg?crop=0.7234375xw:1xh;center,top&resize=640:*"
                }
                date={
                  review.updated_at !== null
                    ? review.updated_at
                    : review.created_at
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
