package com.example.back.follow;

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
@Table(name="follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(updatable = false)
    private Date created_at;
    private Date updated_at;
    @ManyToOne(optional = false)
    @JoinColumn(name = "follower_id", referencedColumnName = "id")
    private User follower;
    @ManyToOne(optional = false)
    @JoinColumn(name = "followed_id", referencedColumnName = "id")
    private User followed;
}
