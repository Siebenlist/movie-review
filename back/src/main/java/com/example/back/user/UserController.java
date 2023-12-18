package com.example.back.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping(value = "/getUserInfo")
    public ResponseEntity<UserResponse> getUserInfo(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        UserResponse userResponse = UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
        return ResponseEntity.ok(userResponse);
    }


    @PostMapping(value = "/userInfo")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        User user = userRepository.findUserByUsername(userRequest.getActualUsername());
        if(userRequest.getNewUsername() != null) {
            if(userRepository.findUserByUsername(userRequest.getActualUsername()) != null) {
                user.setUsername(userRequest.getNewUsername());
                userRepository.save(user);
                return ResponseEntity.ok("Username updated successfully");
            }
        }
        if(userRequest.getEmail() != null) {
            if(userRepository.findUserByEmail(userRequest.getEmail()) != null) {
                user.setEmail(userRequest.getEmail());
                userRepository.save(user);
                return ResponseEntity.ok("Email updated successfully");
            }
        }
        if(userRequest.getPassword() != null) {
            user.setPassword(userRequest.getPassword());
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully");
        }
    }
}
