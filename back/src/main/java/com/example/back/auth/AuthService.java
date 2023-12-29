package com.example.back.auth;

import com.example.back.ExceptionHandler.CustomException;
import com.example.back.jwt.JwtService;
import com.example.back.user.Role;
import com.example.back.user.User;
import com.example.back.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthResponse login(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        if(username == null || password == null) {
            throw new CustomException(400, "The fields can't be empty");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails userDetails = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new CustomException(404, "User doesn't exist"));
        if(!Objects.equals(passwordEncoder.encode(password), userDetails.getPassword())) {
            throw new CustomException(401, "Wrong password");
        }
        String token = jwtService.getToken(userDetails);
        return AuthResponse.builder()
                    .token(token)
                    .build();
    }


    public AuthResponse register(RegisterRequest registerRequest) {
        if(registerRequest.getUsername() == null || registerRequest.getPassword() == null || registerRequest.getEmail() == null) {
            throw new CustomException(400, "The fields can't be empty");
        }
        User user = userRepository.findUserByUsername(registerRequest.getUsername());
        User userEmail = userRepository.findUserByEmail(registerRequest.getEmail());
        if(user != null) {
            throw new CustomException(400, "Username already taken");
        }
        if(userEmail != null) {
            throw new CustomException(400, "Email already taken");
        }
        if(registerRequest.getUsername().length() < 4 || registerRequest.getUsername().length() > 12){
            throw new CustomException(400, "Username must be between 4 and 12 characters");
        }
        if(registerRequest.getPassword().length() < 8) {
            throw new CustomException(400, "Your password must be at least 8 characters");
        }
        Pattern pattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$");
        Matcher matcher = pattern.matcher(registerRequest.getPassword());
        if(!matcher.matches()){
            throw new CustomException(400, "Your password must have at least one capital letter, one lower case and one number");
        }
        Pattern emailPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,6}$");
        Matcher emailMatcher = emailPattern.matcher(registerRequest.getEmail());
        if(!emailMatcher.matches()){
            throw new CustomException(400, "Invalid email address");
        }
        User newUser = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode( registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .role(Role.USER)
                .build();
        userRepository.save(newUser);
        return AuthResponse.builder()
                .token(jwtService.getToken(newUser))
                .build();
    }
}
