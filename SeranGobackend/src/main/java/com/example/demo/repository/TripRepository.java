package com.example.demo.repository;

import com.example.demo.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {
    
    List<Trip> findByTouristId(String touristId);
    
    List<Trip> findByGuideId(String guideId);
    
    List<Trip> findByStatus(Trip.TripStatus status);
    
    List<Trip> findByDestinationContainingIgnoreCase(String destination);
    
    List<Trip> findByTouristIdAndStatus(String touristId, Trip.TripStatus status);
    
    List<Trip> findByGuideIdAndStatus(String guideId, Trip.TripStatus status);
    
    Optional<Trip> findByIdAndTouristId(String id, String touristId);
    
    Optional<Trip> findByIdAndGuideId(String id, String guideId);
    
    List<Trip> findByStatusAndGuideIdIsNull(Trip.TripStatus status);
}
