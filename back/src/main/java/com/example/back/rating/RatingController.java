package com.example.back.rating;

import com.example.back.favourite.FavouriteResponse;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
public class RatingController {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/rating")
    public ResponseEntity<RatingResponse> handleRating(@RequestBody RatingRequest ratingRequest) {
        User user = userRepository.findUserByUsername(ratingRequest.getUsername());
        if(user == null) {
            return null;
        }
        Rating actualRating = ratingRepository.findByMovieIdAndUserId(ratingRequest.getMovieId(), user.getId());
        if (actualRating == null) {
            Rating rating = Rating.builder()
                    .movieId(ratingRequest.getMovieId())
                    .rating(ratingRequest.getRating())
                    .user(user)
                    .build();
            ratingRepository.save(rating);
            return ResponseEntity.ok(RatingResponse.builder()
                    .id(rating.getId())
                    .rating(rating.getRating())
                    .build());
        } else {
            actualRating.setRating(ratingRequest.getRating());
            ratingRepository.save(actualRating);
            return ResponseEntity.ok(RatingResponse.builder()
                    .id(actualRating.getId())
                    .rating(actualRating.getRating())
                    .build());
        }
    }

    @GetMapping(value = "/getPersonalRating")
    public ResponseEntity<RatingResponse> getRating(@RequestParam String username, @RequestParam Integer movieId) {
        User user = userRepository.findUserByUsername(username);
        if(user == null) {
            return null;
        }
        Rating rating = ratingRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (rating == null) {
            //return new ResponseEntity<>(HttpStatus.NOT_FOUND); //Si no encuentra el rating me devuelve un 404

            return ResponseEntity.ok(RatingResponse.builder()
                    .id(null)
                    .rating(null)
                    .build());
        }
        return ResponseEntity.ok(RatingResponse.builder()
                .id(rating.getId())
                .rating(rating.getRating())
                .build());
    }



}
