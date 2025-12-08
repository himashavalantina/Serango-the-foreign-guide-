package com.example.demo.controller;

import com.example.demo.model.Destination;
import com.example.demo.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {
    
    @Autowired
    private DestinationService destinationService;
    
    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        try {
            List<Destination> destinations = destinationService.getAllDestinations();
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/trending")
    public ResponseEntity<List<Destination>> getTrendingDestinations() {
        try {
            List<Destination> destinations = destinationService.getTrendingDestinations();
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Destination>> getFeaturedDestinations() {
        try {
            List<Destination> destinations = destinationService.getFeaturedDestinations();
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinations(@RequestParam String query) {
        try {
            List<Destination> destinations = destinationService.searchDestinations(query);
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/country/{country}")
    public ResponseEntity<List<Destination>> getDestinationsByCountry(@PathVariable String country) {
        try {
            List<Destination> destinations = destinationService.getDestinationsByCountry(country);
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/sustainability/{minScore}")
    public ResponseEntity<List<Destination>> getDestinationsBySustainabilityScore(@PathVariable int minScore) {
        try {
            List<Destination> destinations = destinationService.getDestinationsBySustainabilityScore(minScore);
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable String id) {
        try {
            return destinationService.getDestinationById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        try {
            Destination createdDestination = destinationService.createDestination(destination);
            return ResponseEntity.ok(createdDestination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable String id, 
                                                        @RequestBody Destination destination) {
        try {
            destination.setId(id);
            Destination updatedDestination = destinationService.updateDestination(destination);
            return ResponseEntity.ok(updatedDestination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable String id) {
        try {
            destinationService.deleteDestination(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/sustainability")
    public ResponseEntity<Destination> updateSustainabilityScore(@PathVariable String id, 
                                                               @RequestParam int score) {
        try {
            Destination destination = destinationService.updateSustainabilityScore(id, score);
            return ResponseEntity.ok(destination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/trending")
    public ResponseEntity<Destination> toggleTrending(@PathVariable String id) {
        try {
            Destination destination = destinationService.toggleTrending(id);
            return ResponseEntity.ok(destination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/featured")
    public ResponseEntity<Destination> toggleFeatured(@PathVariable String id) {
        try {
            Destination destination = destinationService.toggleFeatured(id);
            return ResponseEntity.ok(destination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
