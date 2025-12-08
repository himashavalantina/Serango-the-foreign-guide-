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
@Document(collection = "trips")
public class Trip {
    
    @Id
    private String id;
    
    @Field("tourist_id")
    private String touristId;
    
    @Field("guide_id")
    private String guideId;
    
    private String destination;
    private String country;
    
    @Field("arrival_date")
    private LocalDateTime arrivalDate;
    
    @Field("departure_date")
    private LocalDateTime departureDate;
    
    @Field("group_size")
    private int groupSize;
    
    private String budget;
    private List<String> interests;
    private String additionalPreferences;
    
    @Field("trip_status")
    private TripStatus status = TripStatus.DRAFT;
    
    @Field("estimated_cost")
    private double estimatedCost;
    
    @Field("final_cost")
    private double finalCost;
    
    private Itinerary itinerary;
    private List<Bid> bids;
    
    @Field("selected_bid_id")
    private String selectedBidId;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @Field("is_qr_verified")
    private boolean isQrVerified = false;
    
    @Field("qr_verified_at")
    private LocalDateTime qrVerifiedAt;
    
    public enum TripStatus {
        DRAFT, UPCOMING, POSTPONED, COMPLETED, CANCELLED
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Itinerary {
        private String id;
        private List<DayPlan> dayPlans;
        private double totalEstimatedCost;
        private String generatedBy; // AI or Guide
        private LocalDateTime generatedAt;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class DayPlan {
            private int day;
            private LocalDateTime date;
            private List<Activity> activities;
            
            @Data
            @NoArgsConstructor
            @AllArgsConstructor
            public static class Activity {
                private String time;
                private String title;
                private String description;
                private String duration;
                private double cost;
                private String location;
                private String type; // Historical, Food, Nature, etc.
            }
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Bid {
        private String id;
        private String guideId;
        private String guideName;
        private String guideAvatar;
        private double amount;
        private String message;
        private LocalDateTime submittedAt;
        private BidStatus status = BidStatus.PENDING;
        
        public enum BidStatus {
            PENDING, ACCEPTED, REJECTED, WITHDRAWN
        }
    }
}
