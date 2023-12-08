"use client";
import { reviews } from "../data/reviews";
import { useKeenSlider } from "keen-slider/react";

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

export default function Home() {
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
            <a
              href="#"
              className="flex justify-center items-center font-bold text-4xl"
            >
              Horror
            </a>
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
            <a
              href="#"
              className="flex justify-center items-center font-bold text-4xl"
            >
              Thriller
            </a>
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
            <a
              href="#"
              className="flex justify-center items-center font-bold text-4xl"
            >
              Romance
            </a>
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
            <a
              href="#"
              className="flex justify-center items-center font-bold text-4xl"
            >
              Drama
            </a>
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
              <a
                href="#"
                className="flex justify-center items-center font-bold text-4xl"
              >
                Sci-Fi
              </a>
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
              <a
                href="#"
                className="flex justify-center items-center font-bold text-4xl"
              >
                Comedy
              </a>
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
                  poster={review.poster}
                  rating={review.rating}
                  movie={review.movie}
                  user={review.user}
                  review={review.review}
                  pfp={review.pfp}
                />
              );
            })
          }
        </div>
      </section>
    </main>
  );
}
