"use client";

import { useEffect, useState } from "react";
import React from "react";
import RatingComponent from "./RatingComponent";
import { getStorageData } from "@/controllers/localStorageController";
import { useParams } from "next/navigation";

import watchlistOn from "../assets/watchlistOn.svg";
import watchlistOff from "../assets/watchlistOff.svg";

const MovieActions = () => {
  const [movieFaved, setMovieFaved] = useState({ id: null });
  const [favCheck, setFavCheck] = useState();
  const [movieListed, setMovieListed] = useState({ id: null });
  const [listCheck, setListCheck] = useState();
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

  const checkWatchlist = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/watchlisted?username=${userData.user}&movieId=${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (res.ok) {
        const watchlistData = await res.json();
        if (watchlistData.id !== null) {
          setListCheck(true);
        } else {
          setListCheck(false);
        }
      }
    } catch {
      console.log("Error papito check watchlist");
    }
  };

  const handleWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:8080/handleWatchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          username: userData.user,
          movieId: params.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMovieListed(data);
      }
    } catch {
      alert("Erro ao adicionar a lista de favoritos");
    }
  };

  useEffect(() => {
    checkFav();
  }, [movieFaved]);

  useEffect(() => {
    checkWatchlist();
  }, [movieListed]);

  return (
    <div className="bg-menu rounded-md p-2 mb-2">
      <div className="flex items-center justify-center gap-3">
        <button onClick={handleWatchlist} className="hover:scale-105">
          {listCheck ? (
            <img
              className="w-[30px]"
              src={watchlistOn.src}
              alt="Add to watchlist icon"
            />
          ) : (
            <img
              className="w-[30px]"
              src={watchlistOff.src}
              alt="Add to watchlist icon"
            />
          )}
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
