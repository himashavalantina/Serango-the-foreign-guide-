package com.example.demo.controller;

import com.example.demo.dto.ReviewRequest;
import com.example.demo.model.Review;
import com.example.demo.service.ReviewService;
import com.example.demo.service.UserService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<Review> createReview(@Valid @RequestBody ReviewRequest reviewRequest, 
                                              Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            Review review = reviewService.createReview(userId, reviewRequest);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/guide/{guideId}")
    public ResponseEntity<List<Review>> getReviewsByGuide(@PathVariable String guideId) {
        try {
            List<Review> reviews = reviewService.getReviewsByGuide(guideId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Review>> getReviewsByTrip(@PathVariable String tripId) {
        try {
            List<Review> reviews = reviewService.getReviewsByTrip(tripId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-reviews")
    public ResponseEntity<List<Review>> getMyReviews(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            List<Review> reviews = reviewService.getReviewsByTourist(userId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable String reviewId) {
        try {
            return reviewService.getReviewById(reviewId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable String reviewId, 
                                              @Valid @RequestBody ReviewRequest reviewRequest,
                                              Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            Review review = reviewService.updateReview(reviewId, userId, reviewRequest);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable String reviewId, 
                                            Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            reviewService.deleteReview(reviewId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{reviewId}/helpful")
    public ResponseEntity<Review> markHelpful(@PathVariable String reviewId) {
        try {
            Review review = reviewService.markHelpful(reviewId);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
