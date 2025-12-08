package com.example.demo.controller;

import com.example.demo.model.Destination;
import com.example.demo.model.Dispute;
import com.example.demo.model.Trip;
import com.example.demo.model.User;
import com.example.demo.service.DestinationService;
import com.example.demo.service.TripService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TripService tripService;
    
    @Autowired
    private DestinationService destinationService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Object> getDashboardStats() {
        try {
            // Get dashboard statistics
            long totalUsersCount = userService.findByRole(User.UserRole.TOURIST).size() + 
                             userService.findByRole(User.UserRole.GUIDE).size();
            long activeGuidesCount = userService.findByRoleAndIsActive(User.UserRole.GUIDE, true).size();
            long pendingTripsCount = tripService.getTripsByStatus(Trip.TripStatus.UPCOMING).size();
            long completedTripsCount = tripService.getTripsByStatus(Trip.TripStatus.COMPLETED).size();
            
            return ResponseEntity.ok(new Object() {
                public final long totalUsers = totalUsersCount;
                public final long activeGuides = activeGuidesCount;
                public final long pendingTrips = pendingTripsCount;
                public final long completedTrips = completedTripsCount;
            });
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.findByRole(User.UserRole.TOURIST);
            users.addAll(userService.findByRole(User.UserRole.GUIDE));
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guides/pending")
    public ResponseEntity<List<User>> getPendingGuides() {
        try {
            List<User> guides = userService.findByRole(User.UserRole.GUIDE);
            // Filter guides that are not verified
            guides.removeIf(guide -> guide.getGuideProfile() != null && guide.getGuideProfile().isVerified());
            return ResponseEntity.ok(guides);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/guides/{guideId}/verify")
    public ResponseEntity<User> verifyGuide(@PathVariable String guideId) {
        try {
            User guide = userService.findById(guideId)
                    .orElseThrow(() -> new RuntimeException("Guide not found"));
            
            if (guide.getGuideProfile() != null) {
                guide.getGuideProfile().setVerified(true);
                guide.setVerified(true);
                userService.updateUser(guide);
            }
            
            return ResponseEntity.ok(guide);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/guides/{guideId}/reject")
    public ResponseEntity<User> rejectGuide(@PathVariable String guideId) {
        try {
            User guide = userService.findById(guideId)
                    .orElseThrow(() -> new RuntimeException("Guide not found"));
            
            guide.setActive(false);
            userService.updateUser(guide);
            
            return ResponseEntity.ok(guide);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/trips")
    public ResponseEntity<List<Trip>> getAllTrips() {
        try {
            List<Trip> trips = tripService.getTripsByStatus(Trip.TripStatus.UPCOMING);
            trips.addAll(tripService.getTripsByStatus(Trip.TripStatus.COMPLETED));
            trips.addAll(tripService.getTripsByStatus(Trip.TripStatus.CANCELLED));
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/destinations")
    public ResponseEntity<List<Destination>> getAllDestinations() {
        try {
            List<Destination> destinations = destinationService.getAllDestinations();
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/destinations")
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        try {
            Destination createdDestination = destinationService.createDestination(destination);
            return ResponseEntity.ok(createdDestination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/destinations/{id}")
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
    
    @DeleteMapping("/destinations/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable String id) {
        try {
            destinationService.deleteDestination(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/destinations/{id}/sustainability")
    public ResponseEntity<Destination> updateSustainabilityScore(@PathVariable String id, 
                                                               @RequestParam int score) {
        try {
            Destination destination = destinationService.updateSustainabilityScore(id, score);
            return ResponseEntity.ok(destination);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
