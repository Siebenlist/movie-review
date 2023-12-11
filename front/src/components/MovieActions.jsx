"use client";

import { useEffect, useState } from "react";
import React from "react";
import RatingComponent from "./RatingComponent";
import { getStorageData } from "@/controllers/localStorageController";

const MovieActions = ({ movieId }) => {
  const [movieFaved, setMovieFaved] = useState({ id: null });
  const [movieParamsId, setMovieParamsId] = useState(movieId);
  const [favCheck, setFavCheck] = useState();
  const userData = JSON.parse(getStorageData()); //Te trae del localstorage un json stringificado, aca lo parseo a json posta para poder extraer

  const checkFav = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/faved?username=${userData.user}&movieId=${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (res.ok) {
        const favData = await res.json();
        console.log("Una locura lo tuyo", favData);
        if (favData.id !== null) {
          setFavCheck(true);
        } else {
          setFavCheck(false);
        }
      }
    } catch {
      console.log("Error papito");
    }
  };

  const handleFav = async () => {
    try {
      const res = await fetch("http://localhost:8080/fav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({ username: userData.user, movieId: movieId }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        console.log("Uusario", userData.user);
        setMovieFaved(data);
      }
    } catch {
      console.log("Error al agregar a favoritos");
      console.log(userData.token, { username: userData.user, movieId: 2 });
      alert("Erro ao adicionar a lista de favoritos");
    }
  };

  useEffect(() => {
    console.log(
      "info para favoritear: ",
      userData.user,
      movieId,
      userData.token
    );
    console.log("asda", userData.user);
    console.log("Movie faved es:", movieFaved);

    checkFav();
    setMovieParamsId(movieId);
  }, [movieFaved, movieId]);

  return (
    <div className="bg-menu rounded-md p-2 mb-2">
      <div className="flex justify-center gap-3">
        <button className="w-[35px] text-3xl text-slate decoration-dashed">
          &#128065;
        </button>
        <button
          onClick={handleFav}
          className={`w-[35px] text-2xl duration-200 hover:text-[28px] ${
            favCheck ? "text-red" : "text-slate"
          }`}
        >
          &#10084;
        </button>
      </div>
      <div className="text-center">
        <p>Rate this movie</p>
        <RatingComponent movieId={movieParamsId} />
      </div>
    </div>
  );
};

export default MovieActions;
