package com.example.back.ExceptionHandler;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public class CustomException extends RuntimeException {
    private int statusCode;
    private String errorMessage;

    public CustomException(int statusCode, String errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }

}
