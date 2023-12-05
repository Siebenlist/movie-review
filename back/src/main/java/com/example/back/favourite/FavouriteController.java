package com.example.back.favourite;

import com.example.back.user.User;
import com.example.back.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FavouriteController {
    private final FavouriteRepository favouriteRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/fav")
    public boolean handleFav(@RequestBody FavouriteRequest favouriteRequest) {
        String username = favouriteRequest.getUsername();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        Favourite fav = favouriteRepository.findByMovieIdAndUserId(favouriteRequest.getMovieId(), user.getId());
        if (fav == null) {
            Favourite newFav = Favourite.builder()
                    .movieId(favouriteRequest.getMovieId())
                    .user(user)
                    .build();
            favouriteRepository.save(newFav);
            return true;
        }
        favouriteRepository.delete(fav);
        return false;
    }

}
