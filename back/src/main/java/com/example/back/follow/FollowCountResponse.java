package com.example.back.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowCountResponse {
    private Integer followerCount;
    private Integer followedCount;

}
