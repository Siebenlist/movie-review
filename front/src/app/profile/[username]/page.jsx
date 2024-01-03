"use client";

import MoviePoster from "@/components/MoviePoster";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
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
    mode: "snap",
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 3.1, spacing: 5 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4.1, spacing: 10 },
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
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
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
      <article className="w-[500px] md:w-[900px]">
        <div className="w-full">
          <p className="text-slate uppercase">Fav films</p>
          <div className="w-full h-[1px] bg-gray"></div>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider flex gap-3 w-full h-full mt-2 animate-fade-in"
        >
          {favList.length === 0 ? (
            <p className="m-auto text-slate">
              Looks like you dont have any favourite films.
            </p>
          ) : (
            favPosterPaths.map((posterPath, index) => (
              <div key={favList[index].movieId}>
                <MoviePoster
                  poster={posterPath.path}
                  id={favList[index].movieId}
                  carousel
                />
              </div>
            ))
          )}
        </div>
      </article>

      <article className="flex flex-col gap-5 my-[100px] w-full">
        <div className="w-[500px] md:w-[900px]">
          <p className="text-slate uppercase">Recent reviews</p>
          <div className="w-full h-[1px] bg-gray"></div>
        </div>
        <div className="flex flex-col gap-2 divide-y border-b-[1px] border-gray divide-slate">
          {reviewList.length === 0 ? (
            <p>You dont have reviews yet.</p>
          ) : (
            reviewPosterPaths.map((posterPath, index) => (
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
            ))
          )}
        </div>
      </article>
    </section>
  );
};

export default Profile;
