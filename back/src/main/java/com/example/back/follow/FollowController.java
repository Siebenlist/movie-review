package com.example.back.follow;

import com.example.back.user.User;
import com.example.back.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/add")
    public ResponseEntity<FollowResponse> add(@RequestBody FollowRequest followRequest) {
        User follower = userRepository.findUserByUsername(followRequest.getUsername());
        User followed = userRepository.findUserById(followRequest.getFollowedId());
        if (follower == null) {
            return null;
        }
        Follow follow = new Follow();
        follow.setFollowed(followed);
        follow.setFollower(follower);
        followRepository.save(follow);
        return ResponseEntity.ok(FollowResponse.builder()
                .id(follow.getId())
                .build());
    }

    @PostMapping(value = "/remove")
    public ResponseEntity<FollowResponse> remove(@RequestBody FollowRequest followRequest) {
        User user = userRepository.findUserByUsername(followRequest.getUsername());
        if (user == null) {
            return null;
        }
        followRepository.deleteByFollowerIdAndFollowedId(user.getId(), followRequest.getFollowedId());
        return ResponseEntity.ok(FollowResponse.builder()
                .id(null)
                .build());
    }

    @GetMapping(value = "/follow")
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
}
