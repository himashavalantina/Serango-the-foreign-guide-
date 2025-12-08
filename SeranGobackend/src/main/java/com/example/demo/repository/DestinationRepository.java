package com.example.demo.repository;

import com.example.demo.model.Destination;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends MongoRepository<Destination, String> {
    
    List<Destination> findByIsTrendingTrue();
    
    List<Destination> findByIsFeaturedTrue();
    
    List<Destination> findByNameContainingIgnoreCase(String name);
    
    List<Destination> findByCountryContainingIgnoreCase(String country);
    
    List<Destination> findBySustainabilityScoreGreaterThanEqual(int minScore);
    
    List<Destination> findBySustainabilityScoreBetween(int minScore, int maxScore);
}
