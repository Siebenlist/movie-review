import reviewStar from "@/assets/reviewStar.svg";
import MovieActions from "@/components/MovieActions";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/data/reviews";

const MoviePage = () => {
  return (
    <section className="flex flex-col justify-center items-start mt-10 md:mb-[150px] p-3 mx-auto min-h-screen max-w-[1200px]">
      <div className="flex flex-col justify-center items-start md:flex-row mb-5 md:mb-[150px]">
        <div className="w-full flex flex-col justify-center items-center mb-10 gap-5">
          <img
            src="https://m.media-amazon.com/images/M/MV5BZTFkNmE5MjUtZDE1Yi00ZmQyLTk2YWUtN2EwODA1ZmNlOTA5XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg"
            className="w-[150px] md:w-[200px] border border-gray p-[1px] rounded-sm"
          />
          <p>
            Average rating:{" "}
            <span className="inline-flex items-center">
              4.3/5{" "}
              <img
                src={reviewStar.src}
                alt="Review star"
                className="w-[15px]"
              />
            </span>
          </p>
          <MovieActions />
        </div>
        <article className="p-3">
          <h1 className="text-xl md:text-4xl font-bold mb-5">
            Pearl <span>(2023)</span>
          </h1>
          <p className="break-words mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            euismod nunc ut mauris rutrum laoreet. Curabitur scelerisque sed
            nisl eget mollis. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Etiam ultrices, justo
            quis venenatis scelerisque, erat massa aliquam diam, in scelerisque
            felis augue sed quam. In hac habitasse platea dictumst. Integer ut
            condimentum leo. Curabitur id scelerisque magna. Ut lacinia vitae
            ipsum sit amet condimentum. Vestibulum accumsan tortor in elit
            convallis rutrum vel ut justo. Nullam aliquet orci lacus, eget
            efficitur est ornare quis.
          </p>
          <p className="break-words">
            Ut arcu ligula, maximus vitae ex eu, aliquam tempus eros. Mauris sed
            enim quis arcu porta lacinia ut ut eros. Duis leo leo, bibendum eu
            tincidunt eu, laoreet nec tortor. Phasellus imperdiet a urna eget
            tincidunt. Cras consequat dui id sagittis laoreet. Sed bibendum eget
            est ac viverra. Aenean lobortis libero sed erat semper, vestibulum
            aliquet orci congue. Duis facilisis ipsum id convallis condimentum.
            Sed vitae lorem nec purus pulvinar convallis quis quis leo. Morbi
            blandit sodales eros, sed commodo nunc tincidunt at. Proin nec leo
            pellentesque, varius tortor in, imperdiet augue. Morbi eget est dui.
          </p>
        </article>
      </div>
      <div>
        <div className="w-[1200px]">
          <p className="text-slate uppercase">Popular reviews</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div className="divide-y-2 divide-slate divide-opacity-50">
          {reviews.map((review) => {
            return (
              <ReviewCard
                id={review.id}
                movie={review.movie}
                pfp={review.pfp}
                poster={review.poster}
                rating={review.rating}
                review={review.review}
                user={review.user}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
