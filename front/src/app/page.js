"use client";

import Link from "next/link";

import bgHero from "../assets/bg-hero.jpg";
import horrorImg from "../assets/horror-category.jpg";
import thrillerImg from "../assets/thriller-category.jpg";
import romanceImg from "../assets/romance-category.jpg";
import dramaImg from "../assets/drama-category.jpg";
import scifiImg from "../assets/scifi-category.jpg";
import comedyImg from "../assets/comedy-category.jpg";

import Image from "next/image";
import PopularMovies from "@/components/PopularMovies";
import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState([]);

  const getLatestReviews = async () => {
    const options = {
      method: "GET",
      "Content-type": "application/json",
    };

    try {
      const res = await fetch(
        "http://localhost:8080/getLatestReviews",
        options
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data.reviews);
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLatestReviews();
  }, []);

  return (
    <main>
      <div className="h-screen text-center">
        <div className="absolute top-0 left-0 shadow-topM w-full -z-10"></div>
        <div>
          <Image
            className="absolute object-cover top-0 left-0 -z-50"
            src={bgHero}
            fill
            quality={100}
            alt="Background pattern"
          />
        </div>

        <h1 className="text-2xl md:text-5xl font-bold mt-[200px]">
          Track films you’ve watched. <br />
          Save those you want to see. <br />
          Tell your friends what’s good.
        </h1>

        <Link
          href="/login"
          className="inline-flex mt-10 text-xl md:hidden py-1 px-6 bg-button hover:bg-buttonHover duration-200 font-bold rounded-sm"
        >
          Login
        </Link>

        <div className="absolute bottom-0 shadow-botM md:shadow-botD w-full -z-10"></div>

        <article className="flex flex-col justify-center items-center text-center w-[90%] md:w-[50%] mx-auto mt-[250px] md:mt-[350px]">
          <h2 className="text-xl md:text-3xl font-bold">Popular titles</h2>
          <PopularMovies />
        </article>
      </div>

      <section className="mt-0 md:mt-[350px] text-center">
        <h2 className="text-3xl font-bold mb-10">Popular categories</h2>
        <div className="flex flex-wrap justify-center items-center max-w-[1300px] mx-auto gap-10">
          <div className="grid relative w-[320px] md:w-[360px] h-[200px] md:h-[230px] justify-content-strech group overflow-hidden rounded-lg">
            <Image
              src={horrorImg}
              quality={80}
              priority={true}
              fill
              alt="horror category"
              className="absolute -z-10 rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
            />
            <Link
              href={"/list/27/"}
              className="flex justify-center items-center font-bold text-4xl"
            >
              Horror
            </Link>
          </div>
          <div className="grid relative w-[320px] md:w-[360px] h-[200px] md:h-[230px] justify-content-strech group overflow-hidden rounded-lg">
            <Image
              src={thrillerImg}
              fill
              quality={80}
              priority={true}
              alt="thriller category"
              className="absolute -z-10 rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
            />
            <Link
              href={"/list/53/"}
              className="flex justify-center items-center font-bold text-4xl"
            >
              Thriller
            </Link>
          </div>
          <div className="grid relative w-[320px] md:w-[360px] h-[200px] md:h-[230px] justify-content-strech group overflow-hidden rounded-lg">
            <Image
              src={romanceImg}
              fill
              quality={80}
              priority={true}
              alt="romance category"
              className="absolute -z-10 rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
            />
            <Link
              href={"/list/10749/"}
              className="flex justify-center items-center font-bold text-4xl"
            >
              Romance
            </Link>
          </div>

          <div className="grid relative w-[320px] md:w-[360px] h-[200px] md:h-[230px]  justify-content-strech group overflow-hidden rounded-lg">
            <Image
              src={dramaImg}
              fill
              quality={80}
              priority={true}
              alt="drama category"
              className="absolute -z-10 rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
            />
            <Link
              href={"/list/18/"}
              className="flex justify-center items-center font-bold text-4xl"
            >
              Drama
            </Link>
          </div>
          {/* Este div solo se muestra en desktop */}
          <div className="hidden lg:flex gap-10">
            <div className="grid relative w-[330px] md:w-[360px] h-[200px] md:h-[230px]  justify-content-strech group overflow-hidden rounded-lg">
              <Image
                src={scifiImg}
                fill
                quality={80}
                priority={true}
                alt="sci-fi category"
                className="absolute -z-10 rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
              />
              <Link
                href={"/list/878/"}
                className="flex justify-center items-center font-bold text-4xl"
              >
                Sci-Fi
              </Link>
            </div>
            <div className="grid relative w-[320px] md:w-[360px] h-[200px] md:h-[230px]  justify-content-strech group overflow-hidden rounded-lg">
              <Image
                src={comedyImg}
                fill
                quality={80}
                priority={true}
                alt="comedy category"
                className="absolute -z-10 aspect-[16/9] rounded-lg opacity-[0.4] duration-300 group-hover:scale-105"
              />
              <Link
                href={"/list/35/"}
                className="flex justify-center items-center font-bold text-4xl"
              >
                Comedy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center mx-auto my-[200px] max-w-[1200px]">
        <h3 className="text-3xl font-bold text-center mb-10 underline underline-offset-4">
          Popular reviews
        </h3>
        <div className="flex flex-col gap-5 max-w-[1000px] justify-center">
          {
            //Mapeo el array de reviews
            reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  review={review.review}
                  date={review.created_at}
                  user={review.user.username}
                  rating={review.rating.rating}
                />
              );
            })
          }
        </div>
      </section>
    </main>
  );
}
