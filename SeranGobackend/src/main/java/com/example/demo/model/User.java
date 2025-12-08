package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User implements UserDetails {
    
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String profileImage;
    
    @Field("role")
    private UserRole role;
    
    @Field("is_active")
    private boolean isActive = true;
    
    @Field("is_verified")
    private boolean isVerified = false;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    // Guide-specific fields
    private GuideProfile guideProfile;
    
    // Tourist-specific fields
    private TouristProfile touristProfile;
    
    // Admin-specific fields
    private AdminProfile adminProfile;
    
    public enum UserRole {
        TOURIST, GUIDE, ADMIN
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GuideProfile {
        private String bio;
        private String location;
        private List<String> languages;
        private List<String> certifications;
        private List<String> specialties;
        private int experienceYears;
        private double averageRating = 0.0;
        private int totalReviews = 0;
        private double totalEarnings = 0.0;
        private String qrCode;
        private boolean isVerified = false;
        private List<String> documentUrls;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TouristProfile {
        private String bio;
        private String location;
        private List<String> interests;
        private int totalTrips = 0;
        private double totalSpent = 0.0;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminProfile {
        private String department;
        private List<String> permissions;
    }
    
    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return isActive;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
