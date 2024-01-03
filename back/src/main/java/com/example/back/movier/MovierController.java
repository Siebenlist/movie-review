package com.example.back.movier;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movier")
@RequiredArgsConstructor
public class MovierController {
    @PostMapping(value = "/home")
    public String home() {
        return "home from secure endpoint";
    }
}
