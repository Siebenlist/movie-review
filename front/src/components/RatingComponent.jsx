"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";

const RatingComponent = () => {
  const [currentRating, setCurrentRating] = useState(0);

  // Maneja el clic en una estrella
  const handleStarClick = (value) => {
    const newRating = value + 1;

    if (newRating !== currentRating) {
      setCurrentRating(newRating);
    }
  };

  useEffect(() => {
    console.log("Rating seleccionado:", currentRating);
  }, [currentRating]);

  return (
    <div className="box">
      {[5, 4, 3, 2, 1].map((index) => (
        <span
          key={index}
          className={`b1 text-4xl cursor-pointer ${
            index <= currentRating ? "text-star" : "text-slate"
          }`}
          onClick={() => handleStarClick(index - 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
