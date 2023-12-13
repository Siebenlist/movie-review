package com.example.back.favourite;

import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FavouriteController {
    private final FavouriteRepository favouriteRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/fav")
    public ResponseEntity<FavouriteResponse> handleFav(@RequestBody FavouriteRequest favouriteRequest) {
        String username = favouriteRequest.getUsername();
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Favourite fav = favouriteRepository.findByMovieIdAndUserId(favouriteRequest.getMovieId(), user.getId());
        if (fav == null) {
            Favourite newFav = Favourite.builder()
                    .movieId(favouriteRequest.getMovieId())
                    .user(user)
                    .build();
            favouriteRepository.save(newFav);
            return ResponseEntity.ok(FavouriteResponse.builder()
                    .id(newFav.getId())
                    .build());
        }
        favouriteRepository.delete(fav);
        return ResponseEntity.ok(FavouriteResponse.builder()
                .id(null)
                .build());
    }

    //Get para devolver la pelicula si esta fav o no
    @GetMapping(value = "/faved")
    public ResponseEntity<FavouriteResponse> getFav(@RequestParam String username, @RequestParam Integer movieId) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Favourite fav = favouriteRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (fav == null) {
            return ResponseEntity.ok(FavouriteResponse.builder()
                    .id(null)
                    .build());
        }
        return ResponseEntity.ok(FavouriteResponse.builder()
                .id(fav.getId())
                .build());
    }

    @GetMapping(value = "/favList")
    public ResponseEntity<FavListResponse> getFavList(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        FavListResponse favListResponse = FavListResponse.builder()
                .favourites(favouriteRepository.findAllByUserId(user.getId()))
                .build();
        return ResponseEntity.ok(favListResponse);
    }

}
