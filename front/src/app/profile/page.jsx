"use client";

import React, { Suspense } from "react";
import { movies } from "@/data/movies";
import { reviews } from "@/data/reviews";
import MoviePoster from "@/components/MoviePoster";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Loading from "./loading";
import ReviewCard from "@/components/ReviewCard";

const Profile = () => {
  const [sliderRef] = useKeenSlider({
    renderMode: "performance",
    rubberband: false,
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 3.1, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 6.1, spacing: 10 },
      },
    },
    slides: { perView: 2 },
  });

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-col justify-center my-5 max-w-[1200px] mx-auto">
        <article className="">
          <div>
            <p className="text-slate uppercase">Fav films</p>
            <div className="max-w-full h-[1px] bg-gray"></div>
          </div>
          <div
            ref={sliderRef}
            className="keen-slider w-full mt-2 animate-fade-in"
          >
            {movies.map((movie) => {
              return (
                <MoviePoster
                  id={movie.id}
                  poster={movie.poster}
                  title={movie.title}
                  carousel
                />
              );
            })}
          </div>
        </article>

        <article className="flex flex-col gap-5 my-[100px]">
          <div>
            <p className="text-slate uppercase">Recent reviews</p>
            <div className="max-w-full h-[1px] bg-gray"></div>
          </div>
          <div className="flex flex-col gap-2 divide-y border-b-[1px] border-gray divide-slate">
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
        </article>
      </section>
    </Suspense>
  );
};

export default Profile;
