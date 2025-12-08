package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(User.UserRole role);
    
    List<User> findByRoleAndIsActive(User.UserRole role, boolean isActive);
    
    List<User> findByGuideProfileLocationContainingIgnoreCase(String location);
    
    List<User> findByGuideProfileLanguagesContaining(String language);
    
    List<User> findByGuideProfileSpecialtiesContaining(String specialty);
    
    boolean existsByEmail(String email);
}
