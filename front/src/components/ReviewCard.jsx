import React from "react";
import reviewStar from "../assets/reviewStar.svg";
import Image from "next/image";

const ReviewCard = ({ id, poster, rating, movie, user, review, pfp }) => {
  return (
    <article className="review flex gap-10 p-3" key={id}>
      <div className="flex flex-col items-center max-w-[200px]">
        <img className="w-full" src={poster} />
        <p className="inline-flex items-center gap-2 my-2">
          Rating: {rating}{" "}
          <Image src={reviewStar} alt="review star" width={20} />
        </p>
      </div>
      <div className="flex flex-col justify-start gap-2">
        <h3>{movie}</h3>
        <div className="flex items-center gap-3">
          <img className="w-[30px]" src={pfp} alt={user} />
          <a href="#" className="font-semibold">
            {user}
          </a>
        </div>
        <p className="w-full">{review}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
