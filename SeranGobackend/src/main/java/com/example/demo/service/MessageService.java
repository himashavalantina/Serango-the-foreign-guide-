package com.example.demo.service;

import com.example.demo.model.Message;
import com.example.demo.model.User;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Message sendMessage(String senderId, String receiverId, String content, Message.MessageType type) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setConversationId(generateConversationId(senderId, receiverId));
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setSenderName(sender.getFullName());
        message.setSenderAvatar(sender.getProfileImage());
        message.setContent(content);
        message.setType(type);
        message.setCreatedAt(LocalDateTime.now());
        
        return messageRepository.save(message);
    }
    
    public List<Message> getConversation(String userId1, String userId2) {
        // Use a stable conversationId so messages from both directions are included
        String conversationId = generateConversationId(userId1, userId2);
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
    
    public List<Message> getConversationByConversationId(String conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
    
    public List<Message> getUserMessages(String userId) {
        return messageRepository.findBySenderIdOrReceiverIdOrderByCreatedAtDesc(userId, userId);
    }
    
    public List<Message> getUnreadMessages(String userId) {
        return messageRepository.findByReceiverIdAndIsReadFalse(userId);
    }
    
    public long getUnreadMessageCount(String userId) {
        return messageRepository.countByReceiverIdAndIsReadFalse(userId);
    }
    
    public Message markAsRead(String messageId, String userId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        
        if (message.getReceiverId().equals(userId)) {
            message.setRead(true);
            message.setReadAt(LocalDateTime.now());
            return messageRepository.save(message);
        }
        
        throw new RuntimeException("Unauthorized to mark this message as read");
    }
    
    public void markConversationAsRead(String conversationId, String userId) {
        List<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        
        for (Message message : messages) {
            if (message.getReceiverId().equals(userId) && !message.isRead()) {
                message.setRead(true);
                message.setReadAt(LocalDateTime.now());
                messageRepository.save(message);
            }
        }
    }
    
    private String generateConversationId(String userId1, String userId2) {
        // Generate a consistent conversation ID regardless of sender/receiver order
        if (userId1.compareTo(userId2) < 0) {
            return userId1 + "_" + userId2;
        } else {
            return userId2 + "_" + userId1;
        }
    }
}
