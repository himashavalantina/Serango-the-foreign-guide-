package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reviews")
public class Review {
    
    @Id
    private String id;
    
    @Field("trip_id")
    private String tripId;
    
    @Field("tourist_id")
    private String touristId;
    
    @Field("guide_id")
    private String guideId;
    
    @Field("tourist_name")
    private String touristName;
    
    @Field("tourist_avatar")
    private String touristAvatar;
    
    private int rating; // 1-5 stars
    private String comment;
    private List<String> photos;
    
    @Field("category_ratings")
    private CategoryRatings categoryRatings;
    
    @Field("is_helpful")
    private int helpfulCount = 0;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryRatings {
        private int communication; // 1-5
        private int knowledge; // 1-5
        private int punctuality; // 1-5
        private int value; // 1-5
    }
}
