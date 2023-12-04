import React from "react";
import watchlistIcon from "@/assets/watchlistIcon.svg";
import favMovieIcon from "@/assets/favMovieIcon.svg";
import RatingComponent from "./RatingComponent";

const MovieActions = () => {
  return (
    <div className="bg-menu rounded-md p-2 mb-2">
      <div className="flex justify-center gap-3">
        <button className="w-[35px]">
          <img src={watchlistIcon.src} alt="Watchlist eye icon" />
        </button>
        <button className="w-[35px]">
          <img src={favMovieIcon.src} alt="Watchlist eye icon" />
        </button>
      </div>
      <div className="text-center">
        <p>Rate this movie</p>
        <RatingComponent />
      </div>
    </div>
  );
};

export default MovieActions;
