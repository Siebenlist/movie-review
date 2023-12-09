"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";

const RatingComponent = () => {
  const [currentRating, setCurrentRating] = useState(0);

  // Maneja el clic en una estrella
  const handleStarClick = (value) => {
    const newRating = value + 1;

    //Si el rating actual no es igual al rating nuevo, se actualiza y isRated pasa a ser True
    if (newRating !== currentRating) {
      setCurrentRating(newRating);
      setIsRated(true);
    }
  };

  //Maneja el reseteo del rating
  const handleResetRating = () => {
    setCurrentRating(0);
  };

  useEffect(() => {
    console.log("Rating seleccionado:", currentRating);
  }, [currentRating]);

  return (
    <div className="box flex">
      <div>
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
    </div>
  );
};

export default RatingComponent;
