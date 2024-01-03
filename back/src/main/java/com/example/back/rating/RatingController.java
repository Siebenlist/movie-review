package com.example.back.rating;

import com.example.back.ExceptionHandler.CustomException;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequiredArgsConstructor
public class RatingController {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/rating")
    public ResponseEntity<?> handleRating(@RequestBody RatingRequest ratingRequest) {
        User user = userRepository.findUserByUsername(ratingRequest.getUsername());
        if(user == null) {
            throw new IllegalArgumentException("You must be logged to rate a movie");
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
            throw new IllegalArgumentException("You must be logged to rate a movie");
        }
        Rating rating = ratingRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (rating == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(RatingResponse.builder()
                .id(rating.getId())
                .rating(rating.getRating())
                .build());
    }

    @GetMapping(value = "/getGlobalRating")
    public ResponseEntity<GlobalRatingResponse> getGlobalRating(@RequestParam Integer movieId) {
        List<Rating> ratings = ratingRepository.findAllByMovieId(movieId);
        //System.out.println(ratings);
        if (ratings.isEmpty()) {
            return ResponseEntity.ok(GlobalRatingResponse.builder()
                    .movieId(movieId)
                    .globalRating(0.0)
                    .build());
        }else{
            int numberOfRatings = ratings.size();
            Double globalRating = 0.0;
            for (Rating rating : ratings) {
                globalRating += rating.getRating();
            }
            globalRating = globalRating / numberOfRatings;
            return ResponseEntity.ok(GlobalRatingResponse.builder()
                    .movieId(movieId)
                    .globalRating(globalRating)
                    .build());
        }
    }



}
