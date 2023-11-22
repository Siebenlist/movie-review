package com.example.back.follow;

import com.example.back.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @PostMapping(value = "/add/{followedId}")
    public void add(@PathVariable("followedId") Integer followedId, HttpSession session) {
        Integer followerId = (Integer) session.getAttribute("userId");
        if (followerId == null) {
            return;
        }
        Follow follow = new Follow();
        follow.setFollowed(userRepository.findUserById(followedId));
        follow.setFollower(userRepository.findUserById(followerId));
        followRepository.save(follow);
    }

    @PostMapping(value = "/remove/{followedId}")
    public void remove(@PathVariable("followedId") Integer followedId, HttpSession session) {
        Integer followerId = (Integer) session.getAttribute("userId");
        if (followerId == null) {
            return;
        }
        followRepository.deleteByFollowerIdAndFollowedId(followerId, followedId);
    }
}
