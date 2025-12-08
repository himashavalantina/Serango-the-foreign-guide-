package com.example.demo.repository;

import com.example.demo.model.Dispute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisputeRepository extends MongoRepository<Dispute, String> {
    
    List<Dispute> findByStatus(Dispute.DisputeStatus status);
    
    List<Dispute> findByAssignedAdminId(String adminId);
    
    List<Dispute> findByTouristId(String touristId);
    
    List<Dispute> findByGuideId(String guideId);
    
    List<Dispute> findByTripId(String tripId);
}
