package com.example.back.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findByMovieIdAndUserId(Integer movieId, Integer userId);
    void deleteByMovieIdAndUserId(Integer movieId, Integer userId);

    List<Review> findAllByMovieId(Integer movieId);
    List<Review> findAllByUserId(Integer id);
    List<Review> findTop5ByOrderByIdDesc();
}
