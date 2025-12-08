package com.example.demo.repository;

import com.example.demo.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<Notification> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(String userId);
    
    List<Notification> findByUserIdAndTypeOrderByCreatedAtDesc(String userId, Notification.NotificationType type);
    
    long countByUserIdAndIsReadFalse(String userId);
}
