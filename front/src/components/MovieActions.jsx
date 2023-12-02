import React from "react";
import watchlistIcon from "@/assets/watchlistIcon.svg";
import favMovieIcon from "@/assets/favMovieIcon.svg";
import RatingComponent from "./RatingComponent";

const MovieActions = () => {
  return (
    <div className="bg-menu rounded-md p-3">
      <div className="flex justify-center gap-5">
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
