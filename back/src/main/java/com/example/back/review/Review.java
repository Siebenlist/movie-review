package com.example.back.review;

import com.example.back.rating.Rating;
import com.example.back.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer movieId;
    @Column(nullable = false)
    private String review;
    @Column(updatable = false)
    private Date created_at;
    private Date updated_at;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToOne(optional = false)
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    private Rating rating;
}
