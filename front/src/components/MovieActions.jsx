"use client";

import { useEffect, useState } from "react";
import React from "react";
import watchlistIcon from "@/assets/watchlistIcon.svg";
import favMovieIcon from "@/assets/favMovieIcon.svg";
import RatingComponent from "./RatingComponent";
import { getStorageData } from "@/controllers/localStorageController";

const MovieActions = ({ movieId }) => {
  const [movieFaved, setMovieFaved] = useState(null);
  const userData = JSON.parse(getStorageData()); //Te trae del localstorage un json stringificado, aca lo parseo a json posta para poder extraer




useEffect(() => {
 
  console.log("info para favoritear: ",userData.user,movieId,userData.token)
  console.log("asda", userData.user)


}, []);



  const handleFav = async () => {
    try {
      const res = await fetch("http://localhost:8080/fav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({ username: userData.user, movieId: 2 }),
      });

      if (res.ok) {
        console.log("Uusario", userData.user);
      }
    } catch {
      console.log("Error al agregar a favoritos")
      console.log(userData.token, {username: userData.user, movieId: 2})
      alert("Erro ao adicionar a lista de favoritos");
    }
  };

  return (
    <div className="bg-menu rounded-md p-2 mb-2">
      <div className="flex justify-center gap-3">
        <button className="w-[35px]">
          <img src={watchlistIcon.src} alt="Watchlist eye icon" />
        </button>
        <button className="w-[35px]">
          <img
            onClick={handleFav}
            src={favMovieIcon.src}
            alt="Watchlist eye icon"
          />
        </button>
      </div>
      <div className="text-center">
        <p>Rate this movie</p>
        <RatingComponent />
      </div>
    </div>
  );
};

export default MovieActions;