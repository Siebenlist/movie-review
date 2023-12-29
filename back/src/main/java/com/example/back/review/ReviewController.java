package com.example.back.review;

import com.example.back.ExceptionHandler.CustomException;
import com.example.back.rating.Rating;
import com.example.back.rating.RatingRepository;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        String reviewText = reviewRequest.getReview();
        if(actualRating == null) {
            throw new CustomException(406, "You need to rate the movie first");
        }
        if(!(reviewText.length() > 10 && reviewText.length() < 255)){
            throw new CustomException(406, "Review must be between 10 and 255 characters");
        }
        if (actualReview == null) {
                Review review = Review.builder()
                        .movieId(reviewRequest.getMovieId())
                        .review(reviewText)
                        .rating(actualRating)
                        .user(user)
                        .build();
                reviewRepository.save(review);
                return ResponseEntity.ok(ReviewResponse.builder()
                        .id(review.getId())
                        .build());
        } else {
        actualReview.setReview(reviewText);
        reviewRepository.save(actualReview);
        return ResponseEntity.ok(ReviewResponse.builder()
                .id(actualReview.getId())
                .build());
        }
    }

    @GetMapping(value = "/getReview")
    public ResponseEntity<ReviewResponse> getReview(@RequestParam Integer movieId, @RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if(user == null){
            throw new IllegalArgumentException("You must to be logged to review a movie");
        }
        Review review = reviewRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (review == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ReviewResponse.builder()
                    .id(review.getId())
                    .build());
        }
    }

    @GetMapping(value = "/getListReviewMovie")
    public ResponseEntity<ListReviewResponse> getListReviewMovie(@RequestParam Integer movieId) {
        List<Review> reviews = reviewRepository.findAllByMovieId(movieId);
        return ResponseEntity.ok(ListReviewResponse.builder()
                .reviews(reviews)
                .build());
    }

    @GetMapping(value = "/getListReviewUser")
    public ResponseEntity<ListReviewResponse> getListReviewUser(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if(user == null){
            throw new IllegalArgumentException("You must to be logged to review a movie");
        }
        List<Review> reviews = reviewRepository.findAllByUserId(user.getId());
        return ResponseEntity.ok(ListReviewResponse.builder()
                .reviews(reviews)
                .build());
    }

    @GetMapping(value= "/getLatestReviews")
    public ResponseEntity<ListReviewResponse> getLatestReviews() {
        List<Review> reviews = reviewRepository.findTop5ByOrderByIdDesc();
        return ResponseEntity.ok(ListReviewResponse.builder()
                .reviews(reviews)
                .build());
    }
}
