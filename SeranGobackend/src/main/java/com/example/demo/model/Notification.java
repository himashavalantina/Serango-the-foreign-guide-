package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class Notification {
    
    @Id
    private String id;
    
    @Field("user_id")
    private String userId;
    
    private String title;
    private String message;
    private NotificationType type;
    private NotificationPriority priority = NotificationPriority.NORMAL;
    
    @Field("related_trip_id")
    private String relatedTripId;
    
    @Field("related_guide_id")
    private String relatedGuideId;
    
    @Field("is_read")
    private boolean isRead = false;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("read_at")
    private LocalDateTime readAt;
    
    public enum NotificationType {
        TRIP_CONFIRMED,
        TRIP_POSTPONED,
        TRIP_CANCELLED,
        FLIGHT_DELAY,
        FLIGHT_CANCELLED,
        GUIDE_ASSIGNED,
        BID_RECEIVED,
        BID_ACCEPTED,
        BID_REJECTED,
        QR_VERIFIED,
        REVIEW_RECEIVED,
        PAYMENT_RECEIVED,
        SYSTEM_ALERT
    }
    
    public enum NotificationPriority {
        LOW, NORMAL, HIGH, URGENT
    }
}
