package com.example.back.watchlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {

    Watchlist findByMovieIdAndUserId(Integer movieId, Integer userId);

    void deleteByMovieIdAndUserId(Integer movieId, Integer userId);

    List<Watchlist> findAllByUserId(Integer userId);
}
