package com.example.demo.service;

import com.example.demo.dto.TripRequest;
import com.example.demo.model.Trip;
import com.example.demo.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TripService {
    
    @Autowired
    private TripRepository tripRepository;
    
    @Autowired
    private AIService aiService;
    
    public Trip createTrip(String touristId, TripRequest tripRequest) {
        Trip trip = new Trip();
        trip.setId(UUID.randomUUID().toString());
        trip.setTouristId(touristId);
        trip.setDestination(tripRequest.getDestination());
        trip.setArrivalDate(tripRequest.getArrivalDate());
        trip.setDepartureDate(tripRequest.getDepartureDate());
        trip.setGroupSize(tripRequest.getGroupSize());
        trip.setBudget(tripRequest.getBudget());
        trip.setInterests(tripRequest.getInterests());
        trip.setAdditionalPreferences(tripRequest.getAdditionalPreferences());
        trip.setStatus(Trip.TripStatus.DRAFT);
        trip.setCreatedAt(LocalDateTime.now());
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public Trip generateItinerary(String tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        // Generate AI itinerary
        Trip.Itinerary itinerary = aiService.generateItinerary(trip);
        trip.setItinerary(itinerary);
        trip.setEstimatedCost(itinerary.getTotalEstimatedCost());
        trip.setStatus(Trip.TripStatus.UPCOMING);
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public Trip addBid(String tripId, String guideId, String guideName, String guideAvatar, 
                      double amount, String message) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        Trip.Bid bid = new Trip.Bid();
        bid.setId(UUID.randomUUID().toString());
        bid.setGuideId(guideId);
        bid.setGuideName(guideName);
        bid.setGuideAvatar(guideAvatar);
        bid.setAmount(amount);
        bid.setMessage(message);
        bid.setSubmittedAt(LocalDateTime.now());
        bid.setStatus(Trip.Bid.BidStatus.PENDING);
        
        trip.getBids().add(bid);
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public Trip acceptBid(String tripId, String bidId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        Trip.Bid selectedBid = trip.getBids().stream()
                .filter(bid -> bid.getId().equals(bidId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Bid not found"));
        
        // Reject all other bids
        trip.getBids().forEach(bid -> {
            if (!bid.getId().equals(bidId)) {
                bid.setStatus(Trip.Bid.BidStatus.REJECTED);
            } else {
                bid.setStatus(Trip.Bid.BidStatus.ACCEPTED);
            }
        });
        
        trip.setSelectedBidId(bidId);
        trip.setGuideId(selectedBid.getGuideId());
        trip.setFinalCost(selectedBid.getAmount());
        trip.setStatus(Trip.TripStatus.UPCOMING);
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public Trip updateStatus(String tripId, Trip.TripStatus status) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        trip.setStatus(status);
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public Trip verifyQR(String tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        trip.setQrVerified(true);
        trip.setQrVerifiedAt(LocalDateTime.now());
        trip.setUpdatedAt(LocalDateTime.now());
        
        return tripRepository.save(trip);
    }
    
    public List<Trip> getTripsByTourist(String touristId) {
        return tripRepository.findByTouristId(touristId);
    }
    
    public List<Trip> getTripsByGuide(String guideId) {
        return tripRepository.findByGuideId(guideId);
    }
    
    public List<Trip> getAvailableTrips() {
        return tripRepository.findByStatusAndGuideIdIsNull(Trip.TripStatus.UPCOMING);
    }
    
    public Optional<Trip> getTripById(String id) {
        return tripRepository.findById(id);
    }
    
    public List<Trip> getTripsByStatus(Trip.TripStatus status) {
        return tripRepository.findByStatus(status);
    }
}
