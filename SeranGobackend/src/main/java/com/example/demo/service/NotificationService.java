package com.example.demo.service;

import com.example.demo.model.Notification;
import com.example.demo.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public Notification createNotification(String userId, String title, String message, 
                                        Notification.NotificationType type, 
                                        Notification.NotificationPriority priority) {
        Notification notification = new Notification();
        notification.setId(UUID.randomUUID().toString());
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setPriority(priority);
        notification.setCreatedAt(LocalDateTime.now());
        
        return notificationRepository.save(notification);
    }
    
    public Notification createTripNotification(String userId, String title, String message, 
                                             Notification.NotificationType type, String tripId) {
        Notification notification = createNotification(userId, title, message, type, 
                Notification.NotificationPriority.NORMAL);
        notification.setRelatedTripId(tripId);
        return notificationRepository.save(notification);
    }
    
    public Notification createGuideNotification(String userId, String title, String message, 
                                              Notification.NotificationType type, String guideId) {
        Notification notification = createNotification(userId, title, message, type, 
                Notification.NotificationPriority.NORMAL);
        notification.setRelatedGuideId(guideId);
        return notificationRepository.save(notification);
    }
    
    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }
    
    public long getUnreadNotificationCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
    
    public Notification markAsRead(String notificationId, String userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (notification.getUserId().equals(userId)) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
            return notificationRepository.save(notification);
        }
        
        throw new RuntimeException("Unauthorized to mark this notification as read");
    }
    
    public void markAllAsRead(String userId) {
        List<Notification> notifications = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        
        for (Notification notification : notifications) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
            notificationRepository.save(notification);
        }
    }
    
    public List<Notification> getNotificationsByType(String userId, Notification.NotificationType type) {
        return notificationRepository.findByUserIdAndTypeOrderByCreatedAtDesc(userId, type);
    }
    
    public void deleteNotification(String notificationId, String userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (notification.getUserId().equals(userId)) {
            notificationRepository.deleteById(notificationId);
        } else {
            throw new RuntimeException("Unauthorized to delete this notification");
        }
    }
}
