import MoviePoster from "@/components/MoviePoster";
import { movies } from "@/data/movies";

const Watchlist = () => {
  return (
    <section className="max-w-[1200px] h-full mx-auto">
      <div className="flex flex-col w-full md:w-[1200px]">
        <div className="w-full">
          <p className="text-slate uppercase">Fav films</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 auto-rows-max mt-2 place-items-center gap-2 w-full h-[500px] overflow-y-scroll">
          {movies.map((movie) => {
            return (
              <MoviePoster
                id={movie.id}
                poster={movie.poster}
                title={movie.title}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Watchlist;
