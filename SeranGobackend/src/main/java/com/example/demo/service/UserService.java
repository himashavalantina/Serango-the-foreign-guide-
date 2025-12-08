package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return user;
    }
    
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public List<User> findByRole(User.UserRole role) {
        return userRepository.findByRole(role);
    }
    
    public List<User> findByRoleAndIsActive(User.UserRole role, boolean isActive) {
        return userRepository.findByRoleAndIsActive(role, isActive);
    }
    
    public List<User> findGuidesByLocation(String location) {
        return userRepository.findByGuideProfileLocationContainingIgnoreCase(location);
    }
    
    public List<User> findGuidesByLanguage(String language) {
        return userRepository.findByGuideProfileLanguagesContaining(language);
    }
    
    public List<User> findGuidesBySpecialty(String specialty) {
        return userRepository.findByGuideProfileSpecialtiesContaining(specialty);
    }
    
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public User updateGuideProfile(String userId, User.GuideProfile guideProfile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setGuideProfile(guideProfile);
        return userRepository.save(user);
    }
    
    public User updateTouristProfile(String userId, User.TouristProfile touristProfile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setTouristProfile(touristProfile);
        return userRepository.save(user);
    }
}
