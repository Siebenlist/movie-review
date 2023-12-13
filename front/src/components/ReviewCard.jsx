import React from "react";
import reviewStar from "../assets/reviewStar.svg";
import Image from "next/image";

const ReviewCard = ({ id, poster, rating, movie, user, review, pfp }) => {
  return (
    <article className="review flex gap-10 p-5" key={id}>
      <div className="hidden md:flex flex-col items-center w-[100px]">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/original${poster}`}
        />
        <p className="inline-flex justify-center items-center gap-2 mt-2">
          Rating: {rating}
          <span className="text-xl md:text-3xl text-star">&#9733;</span>
        </p>
      </div>
      <div className="flex flex-col justify-start gap-2 max-w-[1000px]">
        <h3 className="font-bold text-xl md:text-3xl">{movie}</h3>
        <div className="flex items-center gap-3">
          <img className="w-[40px] rounded-full" src={pfp} alt={user} />
          <a href="#" className="font-semibold">
            {user}
          </a>
        </div>
        <p className="break-words">{review}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
