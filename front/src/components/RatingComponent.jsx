"use client";
import "@/app/globals.css";
import React, { useState } from "react";

const RatingComponent = () => {
  const [currentRating, setCurrentRating] = useState(0);
  const highlightStars = (index) => {
    setCurrentRating(index + 1);
  };

  const handleStarClick = (index) => {
    setCurrentRating(index + 1);
    console.log("Rating seleccionado:", currentRating);
  };

  return (
    <div className="box">
      {[5, 4, 3, 2, 1].map((index) => (
        <span
          key={index}
          className={`b1 text-4xl bg-clip-text cursor-pointer hover:text-yellow-500 ${
            index <= currentRating + 1 ? "hover:text-star" : ""
          }`}
          onMouseOver={() => highlightStars(index - 1)}
          onMouseOut={() => highlightStars(currentRating - 1)}
          onClick={() => handleStarClick(index - 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
