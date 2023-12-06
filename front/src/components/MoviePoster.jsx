import Link from "next/link";

const MoviePoster = ({ id, poster, title, carousel }) => {
  return (
    //La props carousel se usa solamente cuando se llama a la libreria keen-slider.
    <div
      className={`${
        carousel ? "keen-slider__slide" : "w-[130px] md:w-[190px]"
      }`}
      key={id}
    >
      <Link href={`http://localhost:3000/movie/${id}`}>
        <img
          className="border border-white rounded-sm w-full"
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt={`${title} poster`}
        />
      </Link>
    </div>
  );
};

export default MoviePoster;
