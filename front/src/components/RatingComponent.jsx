"use client";
import "@/app/globals.css";
import hamburgerClose from "../assets/hamburgerClose.svg";
import React, { useState, useEffect } from "react";
import { getStorageData } from "@/controllers/localStorageController";
import { useParams, useRouter } from "next/navigation";

const RatingComponent = () => {
  const [currentRating, setCurrentRating] = useState(null);
  const userData = JSON.parse(getStorageData());
  const [avgRating, setAvgRating] = useState(null);
  const [openReview, setOpenReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const params = useParams();

  const getGlobalRatings = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "Application/json",
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getGlobalRating?movieId=${params.id}`,
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

  const handleReviewBox = () => {
    if (currentRating !== null) {
      setOpenReview(!openReview);
    }
  };

  const submitReview = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        movieId: params.id,
        review: reviewText,
        rating: currentRating,
        username: userData.user,
      }),
    };

    try {
      const res = await fetch("http://localhost:8080/review", options);
      if (res.ok) {
        setOpenReview(!openReview);
      }
      if (res.status === 406) {
        const data = await res.text();
        setError(data);
      }
    } catch {
      console.log("Error review");
    }
  };

  const getRating = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "Application/json",
        Authorization: `Bearer ${userData.token},`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getPersonalRating?username=${userData.user}&movieId=${params.id}`,
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
    if (!userData) {
      router.push("/login");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          movieId: params.id,
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
    }
  };

  useEffect(() => {
    getGlobalRatings();
    if (userData) {
      getRating();
    }
  }, [currentRating]);

  return (
    <div>
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
            disabled={currentRating === null}
            className="mt-3 py-2 px-4 font-bold rounded-md bg-[#3D1465E0] text-white disabled:text-gray disabled:bg-[#c1c1c1bb]"
            onClick={handleReviewBox}
          >
            Make a review
          </button>
        </div>

        <div
          className={
            openReview
              ? "flex absolute top-0 left-0 w-full h-full bg-[#000000cc]"
              : "hidden"
          }
        >
          <div className="flex flex-col items-start w-[350px] md:w-[500px] m-auto bg-primary p-7">
            <div className="w-full flex justify-between items-center mb-5">
              <h2 className="font-bold text-3xl">Write a review</h2>
              <img
                onClick={handleReviewBox}
                className="w-[20px] cursor-pointer"
                src={hamburgerClose.src}
                alt="Close review popup"
              />
            </div>
            <textarea
              cols="10"
              rows="10"
              maxLength={255}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 bg-[#0b0b05ab] resize-none outline-none mb-5"
              placeholder="Leave a review here!"
            />
            {error && (
              <p className="text-white bg-red p-3 my-3 rounded-sm">{error}</p>
            )}
            <button
              onClick={submitReview}
              className="py-2 px-4 rounded-sm bg-button font-bold duration-200 hover:bg-buttonHover"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;
