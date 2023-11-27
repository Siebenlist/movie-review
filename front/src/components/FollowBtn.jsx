"use client";

import { useState } from "react";

const FollowBtn = ({ initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const text = isFollowing ? "Following" : "Follow";

  const buttonStyles = isFollowing
    ? "bg-following hover:bg-followingHover active:bg-followingActive"
    : "bg-button hover:bg-buttonHover active:bg-button";

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <button
      className={`${buttonStyles} py-2 px-6 rounded-full font-bold duration-200`}
      onClick={handleFollow}
    >
      {text}
    </button>
  );
};

export default FollowBtn;
