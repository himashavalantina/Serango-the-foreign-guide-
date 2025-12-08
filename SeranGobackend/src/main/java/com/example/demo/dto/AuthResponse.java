package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    private String type = "Bearer";
    private String userId;
    private String email;
    private String role;
    private String fullName;
    private String profileImage;
    
    public AuthResponse(String token, String userId, String email, String role, String fullName, String profileImage) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.profileImage = profileImage;
    }
}
