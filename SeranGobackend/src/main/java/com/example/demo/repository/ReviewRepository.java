package com.example.demo.repository;

import com.example.demo.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    
    List<Review> findByGuideId(String guideId);
    
    List<Review> findByTripId(String tripId);
    
    List<Review> findByTouristId(String touristId);
    
    List<Review> findByGuideIdOrderByCreatedAtDesc(String guideId);
    
    List<Review> findByRating(int rating);
    
    List<Review> findByGuideIdAndRating(String guideId, int rating);
}
