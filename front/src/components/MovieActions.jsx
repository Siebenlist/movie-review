import React from "react";
import watchlistIcon from "@/assets/watchlistIcon.svg";
import favMovieIcon from "@/assets/favMovieIcon.svg";
import RatingComponent from "./RatingComponent";

const MovieActions = () => {
  return (
    <div>
      <div className="flex gap-5 bg-input p-3 mt-5 rounded-md">
        <div className="w-[50px]">
          <img src={watchlistIcon.src} alt="Watchlist eye icon" />
        </div>
        <div className="w-[50px]">
          <img src={favMovieIcon.src} alt="Watchlist eye icon" />
        </div>
      </div>
      <div>
        <p>Rate this movie</p>
        <RatingComponent />
      </div>
    </div>
  );
};

export default MovieActions;
