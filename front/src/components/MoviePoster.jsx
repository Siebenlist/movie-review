const MoviePoster = ({ id, poster, title, carousel }) => {
  return (
    //La props carousel se usa solamente cuando se llama a la libreria keen-slider.
    <div
      className={`${
        carousel ? "keen-slider__slide" : "w-[130px] md:w-[190px]"
      }`}
      key={id}
    >
      <a href="#">
        <img
          className="border border-white rounded-sm"
          src={poster}
          alt={`${title} poster`}
        />
      </a>
    </div>
  );
};

export default MoviePoster;
