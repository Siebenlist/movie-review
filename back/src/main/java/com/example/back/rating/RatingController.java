package com.example.back.rating;

import com.example.back.favourite.FavouriteResponse;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
                    .build());
        } else {
            actualRating.setRating(ratingRequest.getRating());
            ratingRepository.save(actualRating);
            return ResponseEntity.ok(RatingResponse.builder()
                    .id(actualRating.getId())
                    .build());
        }
    }



}
