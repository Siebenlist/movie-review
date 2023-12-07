package com.example.back.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Integer countByMovieId(Integer movieId);
    Rating findByMovieIdAndUserId(Integer movieId, Integer userId);

    Double avgByMovieId(Integer movieId);
}
