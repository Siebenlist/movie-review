package com.example.back.watchlist;

import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WatchlistController {
    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;
    @PostMapping(value = "/handleWatchlist")
    public ResponseEntity<WatchlistResponse> handleWatchlist(@RequestBody WatchlistRequest watchlistRequest) {
        String username = watchlistRequest.getUsername();
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("You must to be logged to have a watchlist");
        }
        Watchlist watch = watchlistRepository.findByMovieIdAndUserId(watchlistRequest.getMovieId(), user.getId());
        if (watch == null) {
            Watchlist newWatch = Watchlist.builder()
                    .movieId(watchlistRequest.getMovieId())
                    .user(user)
                    .build();
            watchlistRepository.save(newWatch);
            return ResponseEntity.ok(WatchlistResponse.builder()
                    .id(newWatch.getId())
                    .build());
        }
        watchlistRepository.delete(watch);
        return ResponseEntity.accepted().build();
    }

    @GetMapping(value = "/watchlisted")
    public ResponseEntity<WatchlistResponse> getSingularWatchlist(@RequestParam String username, @RequestParam Integer movieId) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("You must to be logged to have a watchlist");
        }
        Watchlist watch = watchlistRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (watch == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(WatchlistResponse.builder()
                .id(watch.getId())
                .build());
    }

    @GetMapping(value = "/watchlist")
    public ResponseEntity<WatchlistUserResponse> getWatchlist(@RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("You must to be logged to have a watchlist");
        }
        return ResponseEntity.ok(WatchlistUserResponse.builder()
                .watchlist(watchlistRepository.findAllByUserId(user.getId()))
                .build());
    }

}
