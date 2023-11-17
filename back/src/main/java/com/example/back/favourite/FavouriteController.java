package com.example.back.favourite;

import com.example.back.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fav")
@RequiredArgsConstructor
public class FavouriteController {
    private final FavouriteRepository favouriteRepository;
    private final UserRepository userRepository;
    @PostMapping(value = "/add/{movieId}")
    public void add(@PathVariable("movieId") Integer movieId, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return;
        }
        Favourite favourite = new Favourite();
        favourite.setMovieId(movieId);
        favourite.setUser(userRepository.findUserById(userId));
        favouriteRepository.save(favourite);

    }
    @PostMapping(value = "/remove/{movieId}")
    public void remove(@PathVariable("movieId") Integer movieId, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return;
        }
        favouriteRepository.deleteByMovieIdAndUserId(movieId, userId);
    }
}
