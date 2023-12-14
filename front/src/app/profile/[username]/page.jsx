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
  const [posterPaths, setPosterPaths] = useState([]);

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
      return data.poster_path;
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
        console.log("Bien get fav movies");
        const data = await res.json();
        setFavList(data.favourites);
      }
    } catch {
      console.log("Mal get fav movies");
    }
  };

  useEffect(() => {
    getFavMovies();
  }, []);

  //TODO: REVISAR ESTO A VER SI SE PUEDE OPTIMIZAR
  useEffect(() => {
    const fetchData = async () => {
      const paths = await Promise.all(
        favList.map(async (fav) => movieDataFetch(fav.movieId))
      );
      setPosterPaths(paths);
    };

    fetchData();
  }, [favList]);

  return (
    <section className="flex flex-col justify-center my-5 max-w-[1200px] mx-auto">
      <article className="">
        <div>
          <p className="text-slate uppercase">Fav films</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider flex gap-3 w-full mt-2 animate-fade-in"
        >
          {posterPaths.map((posterPath, index) => (
            <MoviePoster key={favList[index].id} poster={posterPath} />
          ))}
        </div>
      </article>

      <article className="flex flex-col gap-5 my-[100px]">
        <div>
          <p className="text-slate uppercase">Recent reviews</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="flex flex-col gap-2 divide-y border-b-[1px] border-gray divide-slate">
          {}
        </div>
      </article>
    </section>
  );
};

export default Profile;
