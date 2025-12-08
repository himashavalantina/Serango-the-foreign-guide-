package com.example.demo.controller;

import com.example.demo.dto.BidRequest;
import com.example.demo.model.Trip;
import com.example.demo.model.User;
import com.example.demo.service.TripService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/guide")
@CrossOrigin(origins = "*")
public class GuideController {
    
    @Autowired
    private TripService tripService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/available-trips")
    public ResponseEntity<List<Trip>> getAvailableTrips() {
        try {
            List<Trip> trips = tripService.getAvailableTrips();
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/bids")
    public ResponseEntity<Trip> submitBid(@Valid @RequestBody BidRequest bidRequest, 
                                        Authentication authentication) {
        try {
            String email = authentication.getName();
            User guide = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String guideId = guide.getId();
            
            Trip trip = tripService.addBid(
                    bidRequest.getTripId(),
                    guideId,
                    guide.getFullName(),
                    guide.getProfileImage(),
                    bidRequest.getAmount(),
                    bidRequest.getMessage()
            );
            return ResponseEntity.ok(trip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-trips")
    public ResponseEntity<List<Trip>> getMyTrips(Authentication authentication) {
        try {
            String email = authentication.getName();
            User guide = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String guideId = guide.getId();
            List<Trip> trips = tripService.getTripsByGuide(guideId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<User> getMyProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            return userService.findByEmail(email)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User.GuideProfile guideProfile, 
                                            Authentication authentication) {
        try {
            String email = authentication.getName();
            User guide = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            User user = userService.updateGuideProfile(guide.getId(), guideProfile);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guides")
    public ResponseEntity<List<User>> getAllGuides() {
        try {
            List<User> guides = userService.findByRole(User.UserRole.GUIDE);
            return ResponseEntity.ok(guides);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guides/location/{location}")
    public ResponseEntity<List<User>> getGuidesByLocation(@PathVariable String location) {
        try {
            List<User> guides = userService.findGuidesByLocation(location);
            return ResponseEntity.ok(guides);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guides/language/{language}")
    public ResponseEntity<List<User>> getGuidesByLanguage(@PathVariable String language) {
        try {
            List<User> guides = userService.findGuidesByLanguage(language);
            return ResponseEntity.ok(guides);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guides/specialty/{specialty}")
    public ResponseEntity<List<User>> getGuidesBySpecialty(@PathVariable String specialty) {
        try {
            List<User> guides = userService.findGuidesBySpecialty(specialty);
            return ResponseEntity.ok(guides);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
