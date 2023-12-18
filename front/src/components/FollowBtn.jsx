"use client";

import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const FollowBtn = ({ initialIsFollowing, username, followedUsername }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const userData = JSON.parse(getStorageData());
  // const text = initialIsFollowing !== null ? "Following" : "Follow";

  //TODO: HACER QUE EL BOTON HAGA UN POSTEO A /FOLLOW Y CAMBIE EL TEXTO GLOBALMENTE

  const getFollow = async () => {
const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const res = await fetch(
        `http://localhost:8080/follow?username=${username}&followedUsername=${followedUsername}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        data.id !== null ? setIsFollowing(true) : setIsFollowing(false);
      }
    } catch {
      console.log("Mal el geteo del follow");
    }
  }
  const postFollow = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({ username: username, followedUsername: followedUsername }),
    };
    try {
      const res = await fetch("http://localhost:8080/follow", options);
      if (res.ok) {
        console.log("Bien el posteo del follow");
        setIsFollowing(!initialIsFollowing);
      }
    } catch {
      console.log("Mal el posteo del follow");
    }
  };

  const buttonStyles = isFollowing
    ? "bg-following hover:bg-followingHover active:bg-followingActive"
    : "bg-button hover:bg-buttonHover active:bg-button";

  const handleFollow = () => {
    postFollow();
  };


  return (
    <button
      className={`${buttonStyles} py-2 px-6 rounded-full font-bold duration-200`}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
