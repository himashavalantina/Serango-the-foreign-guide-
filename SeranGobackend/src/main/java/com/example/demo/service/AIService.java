package com.example.demo.service;

import com.example.demo.model.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AIService {
    
    @Value("${ai.gemini.base-url:}")
    private String geminiBaseUrl;
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Trip.Itinerary generateItinerary(Trip trip) {
        // If AI service is not configured, use fallback immediately
        if (geminiBaseUrl == null || geminiBaseUrl.isEmpty()) {
            System.out.println("AI service not configured, using fallback itinerary generation");
            return generateFallbackItinerary(trip);
        }
        
        String prompt = buildItineraryPrompt(trip);
        
        try {
            // Call Gemini AI API
            Map<String, Object> request = new HashMap<>();
            request.put("prompt", prompt);
            request.put("model", "gemini-2.5-flash");
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    geminiBaseUrl + "/api/generate", entity, Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String aiResponse = (String) response.getBody().get("response");
                return parseAIResponse(aiResponse, trip);
            }
        } catch (Exception e) {
            System.err.println("Error calling AI service: " + e.getMessage());
        }
        
        // Fallback: Generate a basic itinerary
        return generateFallbackItinerary(trip);
    }
    
    private String buildItineraryPrompt(Trip trip) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a detailed day-by-day itinerary for a trip with the following details:\n\n");
        prompt.append("Destination: ").append(trip.getDestination()).append("\n");
        prompt.append("Arrival: ").append(trip.getArrivalDate().format(formatter)).append("\n");
        prompt.append("Departure: ").append(trip.getDepartureDate().format(formatter)).append("\n");
        prompt.append("Group Size: ").append(trip.getGroupSize()).append(" people\n");
        prompt.append("Budget: ").append(trip.getBudget()).append("\n");
        prompt.append("Interests: ").append(String.join(", ", trip.getInterests())).append("\n");
        
        if (trip.getAdditionalPreferences() != null && !trip.getAdditionalPreferences().isEmpty()) {
            prompt.append("Additional Preferences: ").append(trip.getAdditionalPreferences()).append("\n");
        }
        
        prompt.append("\nPlease provide a detailed itinerary with:\n");
        prompt.append("1. Day-by-day breakdown\n");
        prompt.append("2. Specific activities with times\n");
        prompt.append("3. Estimated costs for each activity\n");
        prompt.append("4. Duration for each activity\n");
        prompt.append("5. Location details\n");
        prompt.append("6. Total estimated cost\n\n");
        prompt.append("Format the response as a structured JSON-like format that can be parsed programmatically.");
        
        return prompt.toString();
    }
    
    private Trip.Itinerary parseAIResponse(String aiResponse, Trip trip) {
        // This is a simplified parser - in a real implementation, you'd want more robust parsing
        Trip.Itinerary itinerary = new Trip.Itinerary();
        itinerary.setId(UUID.randomUUID().toString());
        itinerary.setGeneratedBy("AI");
        itinerary.setGeneratedAt(LocalDateTime.now());
        
        // For now, generate a basic itinerary structure
        // In a real implementation, you'd parse the AI response
        List<Trip.Itinerary.DayPlan> dayPlans = generateBasicDayPlans(trip);
        itinerary.setDayPlans(dayPlans);
        
        double totalCost = dayPlans.stream()
                .flatMap(day -> day.getActivities().stream())
                .mapToDouble(Trip.Itinerary.DayPlan.Activity::getCost)
                .sum();
        itinerary.setTotalEstimatedCost(totalCost);
        
        return itinerary;
    }
    
    private Trip.Itinerary generateFallbackItinerary(Trip trip) {
        Trip.Itinerary itinerary = new Trip.Itinerary();
        itinerary.setId(UUID.randomUUID().toString());
        itinerary.setGeneratedBy("System");
        itinerary.setGeneratedAt(LocalDateTime.now());
        
        List<Trip.Itinerary.DayPlan> dayPlans = generateBasicDayPlans(trip);
        itinerary.setDayPlans(dayPlans);
        
        double totalCost = dayPlans.stream()
                .flatMap(day -> day.getActivities().stream())
                .mapToDouble(Trip.Itinerary.DayPlan.Activity::getCost)
                .sum();
        itinerary.setTotalEstimatedCost(totalCost);
        
        return itinerary;
    }
    
    private List<Trip.Itinerary.DayPlan> generateBasicDayPlans(Trip trip) {
        List<Trip.Itinerary.DayPlan> dayPlans = new ArrayList<>();
        
        LocalDateTime currentDate = trip.getArrivalDate();
        int dayNumber = 1;
        
        while (currentDate.isBefore(trip.getDepartureDate()) && dayNumber <= 3) {
            Trip.Itinerary.DayPlan dayPlan = new Trip.Itinerary.DayPlan();
            dayPlan.setDay(dayNumber);
            dayPlan.setDate(currentDate);
            
            List<Trip.Itinerary.DayPlan.Activity> activities = new ArrayList<>();
            
            // Morning activity
            Trip.Itinerary.DayPlan.Activity morningActivity = new Trip.Itinerary.DayPlan.Activity();
            morningActivity.setTime("09:00");
            morningActivity.setTitle("City Exploration");
            morningActivity.setDescription("Explore the main attractions of " + trip.getDestination());
            morningActivity.setDuration("3 hours");
            morningActivity.setCost(50.0);
            morningActivity.setLocation(trip.getDestination());
            morningActivity.setType("Sightseeing");
            activities.add(morningActivity);
            
            // Afternoon activity
            Trip.Itinerary.DayPlan.Activity afternoonActivity = new Trip.Itinerary.DayPlan.Activity();
            afternoonActivity.setTime("14:00");
            afternoonActivity.setTitle("Local Cuisine Experience");
            afternoonActivity.setDescription("Try local food and restaurants");
            afternoonActivity.setDuration("2 hours");
            afternoonActivity.setCost(30.0);
            afternoonActivity.setLocation(trip.getDestination());
            afternoonActivity.setType("Food");
            activities.add(afternoonActivity);
            
            dayPlan.setActivities(activities);
            dayPlans.add(dayPlan);
            
            currentDate = currentDate.plusDays(1);
            dayNumber++;
        }
        
        return dayPlans;
    }
}
