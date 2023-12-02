"use client";

import React, { useState } from "react";
import ReviewStar from "@/assets/reviewStar.svg";

const RatingStar = ({ value }) => {
  const [rateHover, setRateHover] = useState(false);

  const handleHover = () => {
    setRateHover(true);
  };

  const handleHoverLeave = () => {
    setRateHover(false);
  };

  return (
    <span
      className={`text-4xl cursor-pointer ${rateHover ? "text-following" : ""}`}
    >
      <div></div>

      <div></div>
    </span>
  );
};

export default RatingStar;
