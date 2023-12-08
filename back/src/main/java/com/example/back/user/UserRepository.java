package com.example.back.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    Optional<User> findById(Integer integer);

    Optional<User> findByUsername(String username);
    User findUserByUsername(String username);

    User findUserById(Integer userId);
}
