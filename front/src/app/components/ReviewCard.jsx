import React from "react";

const ReviewCard = ({ id, poster, rating, movie, user, review, pfp }) => {
  return (
    <article
      className="review flex justify-center gap-5 mx-auto w-[400px] p-3"
      key={id}
    >
      <div className="flex flex-col items-center">
        <img className="w-[100px]" src={poster} />
        <p>Rating: {rating}</p>
      </div>
      <div className="flex flex-col justify-start gap-2 max-w-[400px]">
        <h3>{movie}</h3>
        <div className="flex items-center gap-3">
          <img className="w-[30px]" src={pfp} alt={user} />
          <a href="#">{user}</a>
        </div>
        <p>{review}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
