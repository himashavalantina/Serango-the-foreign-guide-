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
@Document(collection = "disputes")
public class Dispute {
    
    @Id
    private String id;
    
    @Field("trip_id")
    private String tripId;
    
    @Field("tourist_id")
    private String touristId;
    
    @Field("guide_id")
    private String guideId;
    
    @Field("reported_by")
    private String reportedBy; // tourist_id or guide_id
    
    private String reason;
    private String description;
    private List<String> evidenceUrls;
    
    @Field("dispute_status")
    private DisputeStatus status = DisputeStatus.OPEN;
    
    @Field("assigned_admin_id")
    private String assignedAdminId;
    
    @Field("resolution_notes")
    private String resolutionNotes;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @Field("resolved_at")
    private LocalDateTime resolvedAt;
    
    public enum DisputeStatus {
        OPEN, INVESTIGATING, RESOLVED, CLOSED
    }
}
