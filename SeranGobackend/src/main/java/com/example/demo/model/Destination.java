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
@Document(collection = "destinations")
public class Destination {
    
    @Id
    private String id;
    
    private String name;
    private String country;
    private String description;
    private List<String> images;
    private String heroImage;
    
    @Field("sustainability_score")
    private int sustainabilityScore; // 0-100
    
    @Field("is_trending")
    private boolean isTrending = false;
    
    @Field("is_featured")
    private boolean isFeatured = false;
    
    @Field("available_guides")
    private int availableGuides = 0;
    
    @Field("average_price")
    private double averagePrice = 0.0;
    
    @Field("total_trips")
    private int totalTrips = 0;
    
    private List<String> popularActivities;
    private List<String> bestTimeToVisit;
    private String climate;
    private String currency;
    private String language;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    public String getSustainabilityLabel() {
        if (sustainabilityScore >= 80) return "Excellent";
        if (sustainabilityScore >= 60) return "Good";
        if (sustainabilityScore >= 40) return "Fair";
        return "Needs Improvement";
    }
    
    public String getSustainabilityColor() {
        if (sustainabilityScore >= 80) return "#22C55E"; // Green
        if (sustainabilityScore >= 60) return "#F7DC79"; // Yellow
        if (sustainabilityScore >= 40) return "#F7A160"; // Orange
        return "#EF4444"; // Red
    }
}
