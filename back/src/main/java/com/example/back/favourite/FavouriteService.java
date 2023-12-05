package com.example.back.favourite;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavouriteService {
    private final FavouriteRepository favouriteRepository;

    public boolean fav(Integer movieId, Integer userId) {
        Favourite fav = favouriteRepository.findByMovieIdAndUserId(movieId, userId);
        if (fav == null) {
            return false;
        }
        return true;
    }
}
