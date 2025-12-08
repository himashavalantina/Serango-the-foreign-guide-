package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    
    @NotBlank(message = "Trip ID is required")
    private String tripId;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;
    
    private String comment;
    private List<String> photos;
    
    private CategoryRatings categoryRatings;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryRatings {
        @Min(value = 1, message = "Communication rating must be at least 1")
        @Max(value = 5, message = "Communication rating must be at most 5")
        private int communication;
        
        @Min(value = 1, message = "Knowledge rating must be at least 1")
        @Max(value = 5, message = "Knowledge rating must be at most 5")
        private int knowledge;
        
        @Min(value = 1, message = "Punctuality rating must be at least 1")
        @Max(value = 5, message = "Punctuality rating must be at most 5")
        private int punctuality;
        
        @Min(value = 1, message = "Value rating must be at least 1")
        @Max(value = 5, message = "Value rating must be at most 5")
        private int value;
    }
}
