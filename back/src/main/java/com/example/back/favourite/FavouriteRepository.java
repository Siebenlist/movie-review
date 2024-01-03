package com.example.back.favourite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {
    Integer countByMovieId(Integer movieId);
    Favourite findByMovieIdAndUserId(Integer movieId, Integer userId);
    void deleteByMovieIdAndUserId(Integer movieId, Integer userId);
    List<Favourite> findAllByUserId(Integer id);
}
