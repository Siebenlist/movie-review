package com.example.back.favourite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {
    Integer countByMovieId(Integer movieId);

    void deleteByMovieIdAndUserId(Integer movieId, Integer userId);
}
