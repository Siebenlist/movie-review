package com.example.back.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Integer countByMovieId(Integer movieId);
    Rating findByMovieIdAndUserId(Integer movieId, Integer userId);

    List<Rating> findAllByMovieId(Integer movieId); //Para sacar el promedio de las calificaciones de una pelicula
}
