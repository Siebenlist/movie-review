const MoviePoster = ({ id, poster, title }) => {
  return (
    <div className="keen-slider__slide" key={id}>
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
