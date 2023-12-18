package com.example.back.user;

import com.example.back.auth.AuthResponse;
import com.example.back.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

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
            user.setUsername(userRequest.getNewUsername());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), userRequest.getPassword()));
            UserDetails userDetails = userRepository.findByUsername(user.getUsername())
                    .orElseThrow();
            String token = jwtService.getToken(userDetails);
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .build());
        }
        if(userRequest.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), userRequest.getPassword()));
            UserDetails userDetails = userRepository.findByUsername(user.getUsername())
                    .orElseThrow();
            String token = jwtService.getToken(userDetails);
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .build());
        }
        if(userRequest.getEmail() != null) {
            user.setEmail(userRequest.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok("Email updated");
        }
        return ResponseEntity.ok("Nothing updated");
    }
}
