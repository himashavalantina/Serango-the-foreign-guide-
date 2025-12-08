package com.example.demo.service;

import com.example.demo.dto.ReviewRequest;
import com.example.demo.model.Review;
import com.example.demo.model.Trip;
import com.example.demo.model.User;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private TripRepository tripRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Review createReview(String touristId, ReviewRequest reviewRequest) {
        Trip trip = tripRepository.findById(reviewRequest.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (!trip.getTouristId().equals(touristId)) {
            throw new RuntimeException("Unauthorized to review this trip");
        }
        
        if (trip.getStatus() != Trip.TripStatus.COMPLETED) {
            throw new RuntimeException("Can only review completed trips");
        }
        
        User tourist = userRepository.findById(touristId)
                .orElseThrow(() -> new RuntimeException("Tourist not found"));
        
        Review review = new Review();
        review.setId(UUID.randomUUID().toString());
        review.setTripId(reviewRequest.getTripId());
        review.setTouristId(touristId);
        review.setGuideId(trip.getGuideId());
        review.setTouristName(tourist.getFullName());
        review.setTouristAvatar(tourist.getProfileImage());
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setPhotos(reviewRequest.getPhotos());
        review.setCategoryRatings(convertCategoryRatings(reviewRequest.getCategoryRatings()));
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        
        Review savedReview = reviewRepository.save(review);
        
        // Update guide's average rating
        updateGuideRating(trip.getGuideId());
        
        return savedReview;
    }
    
    public List<Review> getReviewsByGuide(String guideId) {
        return reviewRepository.findByGuideIdOrderByCreatedAtDesc(guideId);
    }
    
    public List<Review> getReviewsByTrip(String tripId) {
        return reviewRepository.findByTripId(tripId);
    }
    
    public List<Review> getReviewsByTourist(String touristId) {
        return reviewRepository.findByTouristId(touristId);
    }
    
    public Optional<Review> getReviewById(String id) {
        return reviewRepository.findById(id);
    }
    
    public Review updateReview(String reviewId, String touristId, ReviewRequest reviewRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        if (!review.getTouristId().equals(touristId)) {
            throw new RuntimeException("Unauthorized to update this review");
        }
        
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setPhotos(reviewRequest.getPhotos());
        review.setCategoryRatings(convertCategoryRatings(reviewRequest.getCategoryRatings()));
        review.setUpdatedAt(LocalDateTime.now());
        
        Review savedReview = reviewRepository.save(review);
        
        // Update guide's average rating
        updateGuideRating(review.getGuideId());
        
        return savedReview;
    }
    
    public void deleteReview(String reviewId, String touristId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        if (!review.getTouristId().equals(touristId)) {
            throw new RuntimeException("Unauthorized to delete this review");
        }
        
        reviewRepository.deleteById(reviewId);
        
        // Update guide's average rating
        updateGuideRating(review.getGuideId());
    }
    
    public Review markHelpful(String reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        review.setHelpfulCount(review.getHelpfulCount() + 1);
        return reviewRepository.save(review);
    }
    
    private Review.CategoryRatings convertCategoryRatings(ReviewRequest.CategoryRatings requestRatings) {
        if (requestRatings == null) {
            return null;
        }
        
        Review.CategoryRatings ratings = new Review.CategoryRatings();
        ratings.setCommunication(requestRatings.getCommunication());
        ratings.setKnowledge(requestRatings.getKnowledge());
        ratings.setPunctuality(requestRatings.getPunctuality());
        ratings.setValue(requestRatings.getValue());
        return ratings;
    }
    
    private void updateGuideRating(String guideId) {
        List<Review> reviews = reviewRepository.findByGuideId(guideId);
        
        if (!reviews.isEmpty()) {
            double averageRating = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            
            User guide = userRepository.findById(guideId)
                    .orElseThrow(() -> new RuntimeException("Guide not found"));
            
            if (guide.getGuideProfile() != null) {
                guide.getGuideProfile().setAverageRating(averageRating);
                guide.getGuideProfile().setTotalReviews(reviews.size());
                userRepository.save(guide);
            }
        }
    }
}
