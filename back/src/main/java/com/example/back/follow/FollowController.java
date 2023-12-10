package com.example.back.follow;

import com.example.back.user.User;
import com.example.back.user.UserRepository;
import jakarta.servlet.http.HttpSession;
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
        User followed = userRepository.findUserById(followRequest.getFollowedId());
        if (user == null || followed == null) {
            return null;
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
        return ResponseEntity.ok(FollowResponse.builder()
                .id(null)
                .build());

    }

    @GetMapping(value = "/getFollow")
    public ResponseEntity<FollowResponse> getFollow(@RequestParam String username, @RequestParam Integer followedId) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return null;
        }
        Follow follow = followRepository.findByFollowerIdAndFollowedId(user.getId(), followedId);
        if (follow == null) {
            return ResponseEntity.ok(FollowResponse.builder()
                    .id(null)
                    .build());
        }
        return ResponseEntity.ok(FollowResponse.builder()
                .id(follow.getId())
                .build());
    }
    @GetMapping(value = "/getFollowCount")
    public ResponseEntity<FollowCountResponse> getFollowCount(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return null;
        }
        List<Follow> followerList = followRepository.findAllByFollowerId(user.getId());
        List<Follow> followedList = followRepository.findAllByFollowedId(user.getId());
        if(followerList == null) {
            return ResponseEntity.ok(FollowCountResponse.builder()
                    .followerCount(0)
                    .followedCount(followedList.size())
                    .followerList(null)
                    .followedList(followedList)
                    .build());
        }else if(followedList == null) {
            return ResponseEntity.ok(FollowCountResponse.builder()
                    .followerCount(followerList.size())
                    .followedCount(0)
                    .followerList(followerList)
                    .followedList(null)
                    .build());

        return ResponseEntity.ok(FollowCountResponse.builder()
                .followerCount(followerList.size())
                .followedCount(followedList.size())
                .followerList(followerList)
                .followedList(followedList)
                .build());
    }

}
