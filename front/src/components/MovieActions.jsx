"use client";

import { useEffect, useState } from "react";
import React from "react";
import RatingComponent from "./RatingComponent";
import { getStorageData } from "@/controllers/localStorageController";
import { useParams } from "next/navigation";

const MovieActions = () => {
  const [movieFaved, setMovieFaved] = useState({ id: null });
  const [favCheck, setFavCheck] = useState();
  const userData = JSON.parse(getStorageData()); //Te trae del localstorage un json stringificado, aca lo parseo a json posta para poder extraer
  const params = useParams();

  const checkFav = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/faved?username=${userData.user}&movieId=${params.id}`,
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
        body: JSON.stringify({ username: userData.user, movieId: params.id }),
      });

      if (res.ok) {
        const data = await res.json();
        setMovieFaved(data);
      }
    } catch {
      alert("Erro ao adicionar a lista de favoritos");
    }
  };

  useEffect(() => {
    console.log(params);
    checkFav();
  }, [movieFaved]);

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
        <RatingComponent />
      </div>
    </div>
  );
};

export default MovieActions;
