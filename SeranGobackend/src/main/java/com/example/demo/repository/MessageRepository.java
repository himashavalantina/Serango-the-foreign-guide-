package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    
    List<Message> findByConversationIdOrderByCreatedAtAsc(String conversationId);
    
    List<Message> findBySenderIdAndReceiverIdOrderByCreatedAtAsc(String senderId, String receiverId);
    
    List<Message> findBySenderIdOrReceiverIdOrderByCreatedAtDesc(String senderId, String receiverId);
    
    List<Message> findByReceiverIdAndIsReadFalse(String receiverId);
    
    long countByReceiverIdAndIsReadFalse(String receiverId);
}
