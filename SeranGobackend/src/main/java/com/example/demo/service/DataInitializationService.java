package com.example.demo.service;

import com.example.demo.model.Destination;
import com.example.demo.model.User;
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private DestinationService destinationService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private MessageService messageService;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeSampleData();
    }
    
    private void initializeSampleData() {
        // Initialize sample destinations
        if (destinationService.getAllDestinations().isEmpty()) {
            createSampleDestinations();
        }
        
        // Initialize sample users
        if (userService.findByRole(User.UserRole.TOURIST).isEmpty()) {
            createSampleUsers();
        }
        
        // Initialize sample messages
        if (messageRepository.count() == 0) {
            createSampleMessages();
        }
    }
    
    private void createSampleDestinations() {
        List<Destination> destinations = Arrays.asList(
            createDestination("Santorini", "Greece", 85, true, false, 
                "Beautiful Greek island with stunning sunsets and white-washed buildings"),
            createDestination("Kyoto", "Japan", 92, true, true, 
                "Ancient capital with temples, gardens, and traditional culture"),
            createDestination("Lisbon", "Portugal", 78, false, false, 
                "Historic city with colorful tiles and delicious pastries"),
            createDestination("Paris", "France", 72, false, true, 
                "City of lights with world-famous landmarks and cuisine"),
            createDestination("Barcelona", "Spain", 68, false, false, 
                "Vibrant city with unique architecture and Mediterranean charm"),
            createDestination("Reykjavik", "Iceland", 95, true, true, 
                "Northern capital with geothermal wonders and aurora borealis"),
            createDestination("Bali", "Indonesia", 56, false, false, 
                "Tropical paradise with temples, beaches, and rice terraces"),
            createDestination("Dubai", "UAE", 48, false, false, 
                "Modern metropolis with luxury shopping and futuristic architecture")
        );
        
        destinations.forEach(destinationService::createDestination);
    }
    
    private Destination createDestination(String name, String country, int sustainabilityScore, 
                                        boolean isTrending, boolean isFeatured, String description) {
        Destination destination = new Destination();
        destination.setName(name);
        destination.setCountry(country);
        destination.setDescription(description);
        destination.setSustainabilityScore(sustainabilityScore);
        destination.setTrending(isTrending);
        destination.setFeatured(isFeatured);
        destination.setAvailableGuides((int) (Math.random() * 20) + 5);
        destination.setAveragePrice(Math.random() * 200 + 50);
        destination.setTotalTrips((int) (Math.random() * 100) + 10);
        destination.setPopularActivities(Arrays.asList("Sightseeing", "Food Tours", "Cultural Experiences"));
        destination.setBestTimeToVisit(Arrays.asList("Spring", "Fall"));
        destination.setClimate("Mediterranean");
        destination.setCurrency("EUR");
        destination.setLanguage("English");
        return destination;
    }
    
    private void createSampleUsers() {
        // Create sample admin
        User admin = new User();
        admin.setEmail("admin@serango.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setRole(User.UserRole.ADMIN);
        admin.setActive(true);
        admin.setVerified(true);
        admin.setAdminProfile(new User.AdminProfile());
        userService.createUser(admin);
        
        // Create sample tourists
        createSampleTourist("tourist1@serango.com", "John", "Doe", "New York, USA");
        createSampleTourist("tourist2@serango.com", "Jane", "Smith", "London, UK");
        createSampleTourist("tourist3@serango.com", "Mike", "Johnson", "Toronto, Canada");
        
        // Create sample guides
        createSampleGuide("guide1@serango.com", "Sophie", "Martin", "Paris, France", 
            Arrays.asList("French", "English"), Arrays.asList("Historical Sites", "Food Tours"));
        createSampleGuide("guide2@serango.com", "Maria", "Garcia", "Barcelona, Spain", 
            Arrays.asList("Spanish", "English", "Catalan"), Arrays.asList("Architecture", "Art"));
        createSampleGuide("guide3@serango.com", "Yuki", "Tanaka", "Tokyo, Japan", 
            Arrays.asList("Japanese", "English"), Arrays.asList("Culture", "Temples"));
        createSampleGuide("guide4@serango.com", "Ahmed", "Hassan", "Cairo, Egypt", 
            Arrays.asList("Arabic", "English"), Arrays.asList("Historical Sites", "Museums"));
    }
    
    private void createSampleTourist(String email, String firstName, String lastName, String location) {
        User tourist = new User();
        tourist.setEmail(email);
        tourist.setPassword(passwordEncoder.encode("password123"));
        tourist.setFirstName(firstName);
        tourist.setLastName(lastName);
        tourist.setRole(User.UserRole.TOURIST);
        tourist.setActive(true);
        tourist.setVerified(true);
        
        User.TouristProfile profile = new User.TouristProfile();
        profile.setLocation(location);
        profile.setInterests(Arrays.asList("Historical Sites", "Food & Dining", "Nature & Parks"));
        tourist.setTouristProfile(profile);
        
        userService.createUser(tourist);
    }
    
    private void createSampleGuide(String email, String firstName, String lastName, String location, 
                                 List<String> languages, List<String> specialties) {
        User guide = new User();
        guide.setEmail(email);
        guide.setPassword(passwordEncoder.encode("password123"));
        guide.setFirstName(firstName);
        guide.setLastName(lastName);
        guide.setRole(User.UserRole.GUIDE);
        guide.setActive(true);
        guide.setVerified(true);
        
        User.GuideProfile profile = new User.GuideProfile();
        profile.setBio("Experienced local guide with deep knowledge of the area");
        profile.setLocation(location);
        profile.setLanguages(languages);
        profile.setSpecialties(specialties);
        profile.setExperienceYears((int) (Math.random() * 10) + 2);
        profile.setAverageRating(4.5 + Math.random() * 0.5);
        profile.setTotalReviews((int) (Math.random() * 100) + 20);
        profile.setTotalEarnings(Math.random() * 5000 + 1000);
        profile.setQrCode("QR_" + email.replace("@", "_"));
        profile.setVerified(true);
        guide.setGuideProfile(profile);
        
        userService.createUser(guide);
    }
    
    private void createSampleMessages() {
        userService.findByEmail("tourist1@serango.com").ifPresent(tourist -> {
            userService.findByEmail("guide1@serango.com").ifPresent(guide -> {
                messageService.sendMessage(tourist.getId(), guide.getId(), "Hi! I'm visiting soon and would love a tour.", Message.MessageType.TEXT);
                messageService.sendMessage(guide.getId(), tourist.getId(), "Hello! I'd be happy to guide you around Paris.", Message.MessageType.TEXT);
                messageService.sendMessage(tourist.getId(), guide.getId(), "Great! What's your availability next week?", Message.MessageType.TEXT);
            });
        });
    }
}
