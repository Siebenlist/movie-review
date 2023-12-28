package com.example.back.follow;

import com.example.back.ExceptionHandler.CustomException;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowController {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/follow")
    public ResponseEntity<FollowResponse> handleFollow(@RequestBody FollowRequest followRequest) {
        User user = userRepository.findUserByUsername(followRequest.getUsername());
        User followed = userRepository.findUserByUsername(followRequest.getFollowedUsername());
        if (user == null) {
            throw new IllegalArgumentException("You must be logged to follow someone");
        }
        if (followed == null) {
            throw new CustomException(404, "User not found");
        }
        Follow follow = followRepository.findByFollowerIdAndFollowedId(user.getId(), followed.getId());
        if (follow == null) {
            Follow newFollow = Follow.builder()
                    .follower(user)
                    .followed(followed)
                    .build();
            followRepository.save(newFollow);
            return ResponseEntity.ok(FollowResponse.builder()
                    .id(newFollow.getId())
                    .build());
        }
        followRepository.delete(follow);
        return ResponseEntity.accepted().build();
    }

    @GetMapping(value = "/getFollow")
    public ResponseEntity<FollowResponse> getFollow(@RequestParam String username, @RequestParam String followedUsername) {
        User user = userRepository.findUserByUsername(username);
        User followed = userRepository.findUserByUsername(followedUsername);
        if (user == null) {
            throw new IllegalArgumentException("You must be logged to follow someone");
        }
        Follow follow = followRepository.findByFollowerIdAndFollowedId(user.getId(), followed.getId());
        if (follow == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(FollowResponse.builder()
                .id(follow.getId())
                .build());
    }
    @GetMapping(value = "/getFollowList")
    public ResponseEntity<FollowListResponse> getFollowList(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("You must be logged to follow someone");
        }
        List<Follow> followerList = followRepository.findAllByFollowedId(user.getId());
        List<Follow> followedList = followRepository.findAllByFollowerId(user.getId());
        if (followerList == null) {
            return ResponseEntity.ok(FollowListResponse.builder()
                    .followerList(null)
                    .followedList(followedList)
                    .build());
        } else if (followedList == null) {
            return ResponseEntity.ok(FollowListResponse.builder()
                    .followerList(followerList)
                    .followedList(null)
                    .build());

        }
        return ResponseEntity.ok(FollowListResponse.builder()
                .followerList(followerList)
                .followedList(followedList)
                .build());
    }
    @GetMapping(value = "/getFollowCount")
    public ResponseEntity<FollowCountResponse> getFollowCount(@RequestParam String username){
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("You must be logged to follow someone");
        }
        Integer followerCount = followRepository.countAllByFollowedId(user.getId());
        Integer followedCount = followRepository.countAllByFollowerId(user.getId());
        if(followerCount == null){
            return ResponseEntity.ok(FollowCountResponse.builder()
                    .followerCount(0)
                    .followedCount(followedCount)
                    .build());
        }
        if (followedCount == null){
            return ResponseEntity.ok(FollowCountResponse.builder()
                    .followerCount(followerCount)
                    .followedCount(0)
                    .build());
        }
        return ResponseEntity.ok(FollowCountResponse.builder()
                .followerCount(followerCount)
                .followedCount(followedCount)
                .build());
    }

}
