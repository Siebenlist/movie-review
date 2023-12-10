"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import { getStorageData } from "@/controllers/localStorageController";

const RatingComponent = ({ movieId }) => {
  const [currentRating, setCurrentRating] = useState();
  const userData = JSON.parse(getStorageData());

  //Maneja el clic en una estrella
  const handleStarClick = (value) => {
    const newRating = value + 1;

    //Si el rating actual no es igual al rating nuevo, se actualiza y isRated pasa a ser True
    if (newRating !== currentRating) {
      setCurrentRating(newRating);
    }
  };

  const getRating = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "Application/json",
        Authorization: `Bearer ${userData.token},`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getPersonalRating?username=${userData.user}&movieId=${movieId}`,
        options
      );
      if (res.ok) {
        const ratingData = await res.json();
        setCurrentRating(ratingData.rating);
        console.log("aca esta el coso del get del rating", ratingData);
      }
    } catch {
      console.log("Error al obtener el rating");
    }
  };

  const submitRating = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        movieId: movieId,
        rating: currentRating,
        username: userData.user,
      }),
    };

    try {
      const res = await fetch("http://localhost:8080/rating", options);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch {
      console.log("una cagada tu fetcheo");
    }
  };

  useEffect(() => {
    submitRating();
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
