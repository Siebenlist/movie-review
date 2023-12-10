package com.example.back.rating;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GlobalRatingResponse {

    private Integer movieId;
    private Double globalRating;
    private Integer numberOfRatings;
}
