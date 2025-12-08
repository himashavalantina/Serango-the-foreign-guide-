package com.example.demo.controller;

import com.example.demo.dto.TripRequest;
import com.example.demo.model.Trip;
import com.example.demo.service.TripService;
import com.example.demo.service.UserService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {
    
    @Autowired
    private TripService tripService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<Trip> createTrip(@Valid @RequestBody TripRequest tripRequest, 
                                         Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            Trip trip = tripService.createTrip(userId, tripRequest);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{tripId}/generate-itinerary")
    public ResponseEntity<Trip> generateItinerary(@PathVariable String tripId, 
                                                Authentication authentication) {
        try {
            Trip trip = tripService.generateItinerary(tripId);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{tripId}/bids")
    public ResponseEntity<Trip> addBid(@PathVariable String tripId, 
                                     @RequestParam String guideId,
                                     @RequestParam String guideName,
                                     @RequestParam String guideAvatar,
                                     @RequestParam double amount,
                                     @RequestParam String message,
                                     Authentication authentication) {
        try {
            Trip trip = tripService.addBid(tripId, guideId, guideName, guideAvatar, amount, message);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{tripId}/bids/{bidId}/accept")
    public ResponseEntity<Trip> acceptBid(@PathVariable String tripId, 
                                        @PathVariable String bidId,
                                        Authentication authentication) {
        try {
            Trip trip = tripService.acceptBid(tripId, bidId);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{tripId}/status")
    public ResponseEntity<Trip> updateStatus(@PathVariable String tripId, 
                                           @RequestParam String status,
                                           Authentication authentication) {
        try {
            Trip.TripStatus tripStatus = Trip.TripStatus.valueOf(status.toUpperCase());
            Trip trip = tripService.updateStatus(tripId, tripStatus);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{tripId}/verify-qr")
    public ResponseEntity<Trip> verifyQR(@PathVariable String tripId, 
                                       Authentication authentication) {
        try {
            Trip trip = tripService.verifyQR(tripId);
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-trips")
    public ResponseEntity<List<Trip>> getMyTrips(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            List<Trip> trips = tripService.getTripsByTourist(userId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guide-trips")
    public ResponseEntity<List<Trip>> getGuideTrips(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            List<Trip> trips = tripService.getTripsByGuide(userId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Trip>> getAvailableTrips() {
        try {
            List<Trip> trips = tripService.getAvailableTrips();
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{tripId}")
    public ResponseEntity<Trip> getTripById(@PathVariable String tripId) {
        try {
            return tripService.getTripById(tripId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
