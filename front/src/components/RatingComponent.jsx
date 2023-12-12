"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import { getStorageData } from "@/controllers/localStorageController";
import Router from "next/navigation";

const RatingComponent = ({ movieId }) => {
  const [currentRating, setCurrentRating] = useState(null);
  const userData = JSON.parse(getStorageData());
  const [avgRating, setAvgRating] = useState(null);

  const getGlobalRatings = async (movie_id) => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "Application/json",
        Authorization: `Bearer ${userData.token},`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getGlobalRating?movieId=${movie_id}`,
        options
      );
      if (res.ok) {
        const ratingData = await res.json();
        setAvgRating(ratingData.globalRating);
      }
    } catch {
      console.log("Error al obtener el rating");
    }
  };

  //Maneja el clic en una estrella
  const handleStarClick = async (value) => {
    const newRating = value + 1;

    //Si el rating actual no es igual al rating nuevo, se actualiza y isRated pasa a ser True
    if (newRating !== currentRating) {
      await submitRating(newRating);
    }
  };

  const redirigir = () => {
    if (currentRating !== null) {
      // Obtén la URL deseada (ajústala según tus necesidades)
      const url = `https://localhost:3000/movie/${movieId}/review`;
      // Redirige a la URL
      Router.redirect(url);
    }
  };

  const getRating = async (movie_id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "Application/json",
        Authorization: `Bearer ${userData.token},`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getPersonalRating?username=${userData.user}&movieId=${movie_id}`,
        options
      );
      if (res.ok) {
        const ratingData = await res.json();
        setCurrentRating(ratingData.rating);
      }
    } catch {
      console.log("Error al obtener el rating");
    }
  };

  const submitRating = async (rating) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        movieId: movieId,
        rating: rating,
        username: userData.user,
      }),
    };

    try {
      const res = await fetch("http://localhost:8080/rating", options);
      if (res.ok) {
        const data = await res.json();
        setCurrentRating(data.rating);
      }
    } catch {
      console.log("posteo rating fail");
    }
  };

  useEffect(() => {
    getGlobalRatings(movieId);
    getRating(movieId);
  }, [currentRating]);

  return (
    <div>
      <span>Avg. Rating: {avgRating}</span>
      <div className="box flex flex-col">
        <div>
          {[5, 4, 3, 2, 1].map((index) => {
            return (
              <span
                key={index}
                className={`b1 text-4xl cursor-pointer ${
                  index <= currentRating ? "text-star" : "text-slate"
                }`}
                onClick={() => handleStarClick(index - 1)}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <button
          href={`${movieId}/review`}
          disabled={currentRating === null}
          className="mt-3 py-2 px-4 font-bold rounded-md bg-[#3D1465E0] text-white disabled:text-gray disabled:bg-[#c1c1c1bb]"
          onClick={redirigir}
        >
          Make a review
        </button>
      </div>
    </div>
  );
};

export default RatingComponent;
