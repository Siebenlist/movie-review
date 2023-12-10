package com.example.back.review;

import com.example.back.rating.Rating;
import com.example.back.rating.RatingRepository;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;

    @PostMapping(value = "/review")
    public ResponseEntity<ReviewResponse> handleReview(@RequestBody ReviewRequest reviewRequest) {
        User user = userRepository.findUserByUsername(reviewRequest.getUsername());
        Review actualReview = reviewRepository.findByMovieIdAndUserId(reviewRequest.getMovieId(), user.getId());
        Rating actualRating = ratingRepository.findByMovieIdAndUserId(reviewRequest.getMovieId(), user.getId());
        if(actualRating == null) {
            return null;
        }
        if (actualReview == null) {
            Review review = Review.builder()
                    .movieId(reviewRequest.getMovieId())
                    .review(reviewRequest.getReview())
                    .rating(actualRating)
                    .user(user)
                    .build();
            reviewRepository.save(review);
            return ResponseEntity.ok(ReviewResponse.builder()
                    .id(review.getId())
                    .build());
        } else {
            actualReview.setReview(reviewRequest.getReview());
            reviewRepository.save(actualReview);
            return ResponseEntity.ok(ReviewResponse.builder()
                    .id(actualReview.getId())
                    .build());
        }
    }

}
