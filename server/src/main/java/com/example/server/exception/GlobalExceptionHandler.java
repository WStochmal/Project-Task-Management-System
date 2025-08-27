package com.example.server.exception;


import com.example.server.dto.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(Exception e) {
        ApiResponse response = new ApiResponse(false, e.getMessage(), null);
        return ResponseEntity.status(500).body(response);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse> handleEntityNotFoundException(EntityNotFoundException e) {
        ApiResponse response = new ApiResponse(false, e.getMessage(), null);
        return ResponseEntity.status(404).body(response);
    }
}
