package com.example.back.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowerIdAndFollowedId(Integer followerId, Integer followedId);
    Integer countByFollowerId(Integer followerId);
    Integer countByFollowedId(Integer followedId);

    default void deleteByFollowerIdAndFollowedId(Integer followerId, Integer followedId) {
        findByFollowerIdAndFollowedId(followerId, followedId).ifPresent(this::delete);
    }
}
