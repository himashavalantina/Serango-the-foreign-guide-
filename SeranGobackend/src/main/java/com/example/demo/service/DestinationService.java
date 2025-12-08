package com.example.demo.service;

import com.example.demo.model.Destination;
import com.example.demo.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }
    
    public List<Destination> getTrendingDestinations() {
        return destinationRepository.findByIsTrendingTrue();
    }
    
    public List<Destination> getFeaturedDestinations() {
        return destinationRepository.findByIsFeaturedTrue();
    }
    
    public List<Destination> searchDestinations(String query) {
        return destinationRepository.findByNameContainingIgnoreCase(query);
    }
    
    public List<Destination> getDestinationsByCountry(String country) {
        return destinationRepository.findByCountryContainingIgnoreCase(country);
    }
    
    public List<Destination> getDestinationsBySustainabilityScore(int minScore) {
        return destinationRepository.findBySustainabilityScoreGreaterThanEqual(minScore);
    }
    
    public Optional<Destination> getDestinationById(String id) {
        return destinationRepository.findById(id);
    }
    
    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
    
    public Destination updateDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
    
    public void deleteDestination(String id) {
        destinationRepository.deleteById(id);
    }
    
    public Destination updateSustainabilityScore(String id, int score) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
        destination.setSustainabilityScore(score);
        return destinationRepository.save(destination);
    }
    
    public Destination toggleTrending(String id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
        destination.setTrending(!destination.isTrending());
        return destinationRepository.save(destination);
    }
    
    public Destination toggleFeatured(String id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
        destination.setFeatured(!destination.isFeatured());
        return destinationRepository.save(destination);
    }
}
