package com.example.demo.service;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public AuthResponse authenticate(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String token = jwtUtil.generateToken(
                userDetails,
                user.getId(),
                user.getRole().name(),
                user.getFullName(),
                user.getProfileImage()
        );
        
        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getRole().name(),
                user.getFullName(),
                user.getProfileImage()
        );
    }
    
    public User register(AuthRequest authRequest) {
        if (userService.existsByEmail(authRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(authRequest.getEmail());
        user.setPassword(authRequest.getPassword());
        user.setRole(User.UserRole.valueOf(authRequest.getRole().toUpperCase()));
        
        // Initialize role-specific profiles
        switch (user.getRole()) {
            case GUIDE:
                user.setGuideProfile(new User.GuideProfile());
                break;
            case TOURIST:
                user.setTouristProfile(new User.TouristProfile());
                break;
            case ADMIN:
                user.setAdminProfile(new User.AdminProfile());
                break;
        }
        
        return userService.createUser(user);
    }
}
