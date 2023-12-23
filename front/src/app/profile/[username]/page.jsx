"use client";

import MoviePoster from "@/components/MoviePoster";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import ReviewCard from "@/components/ReviewCard";
import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const Profile = ({ params }) => {
  const userData = JSON.parse(getStorageData());
  const [favList, setFavList] = useState([]);
  const [favPosterPaths, setFavPosterPaths] = useState([]);
  const [reviewPosterPaths, setReviewPosterPaths] = useState([]);
  const [reviewList, setReviewList] = useState([]);

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

  const fetchFavPosters = async () => {
    const paths = await Promise.all(
      favList.map(async (fav) => movieDataFetch(fav.movieId))
    );
    setFavPosterPaths(paths);
  };

  const fetchReviewPosters = async () => {
    const paths = await Promise.all(
      reviewList.map(async (review) => movieDataFetch(review.movieId))
    );
    setReviewPosterPaths(paths);
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
        title: data.original_title,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const getFavMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/favList?username=${params.username}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        setFavList(data.favourites);
      }
    } catch {}
  };
  const getReviewedMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getListReviewUser?username=${params.username}`,
        options
      );
      if (res.ok) {
        console.log("Bien get review movies");
        const data = await res.json();
        setReviewList(data.reviews);
      }
    } catch {
      console.log("Mal get review movies");
    }
  };

  useEffect(() => {
    getFavMovies();
    getReviewedMovies();
  }, []);

  useEffect(() => {
    fetchReviewPosters();
  }, [reviewList]);
  useEffect(() => {
    fetchFavPosters();
  }, [favList]);

  return (
    <section className="flex flex-col justify-center my-5 max-w-[1200px] mx-auto">
      <article className="">
        <div className="w-full">
          <p className="text-slate uppercase">Fav films</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider flex gap-3 w-full mt-2 animate-fade-in"
        >
          {favPosterPaths.map((posterPath, index) => (
            <div key={favList[index].movieId}>
              <MoviePoster
                poster={posterPath.path}
                id={favList[index].movieId}
              />
            </div>
          ))}
        </div>
      </article>

      <article className="flex flex-col gap-5 my-[100px] w-full">
        <div className="w-full">
          <p className="text-slate uppercase">Recent reviews</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="flex flex-col gap-2 divide-y border-b-[1px] border-gray divide-slate">
          {reviewPosterPaths.map((posterPath, index) => (
            <ReviewCard
              key={reviewList[index].movieId}
              review={reviewList[index].review}
              poster={posterPath.path}
              rating={reviewList[index].rating.rating}
              movie={posterPath.title}
              date={
                reviewList[index].updated_at !== null
                  ? reviewList[index].updated_at
                  : reviewList[index].created_at
              }
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Profile;
