package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "messages")
public class Message {
    
    @Id
    private String id;
    
    @Field("conversation_id")
    private String conversationId;
    
    @Field("sender_id")
    private String senderId;
    
    @Field("receiver_id")
    private String receiverId;
    
    @Field("sender_name")
    private String senderName;
    
    @Field("sender_avatar")
    private String senderAvatar;
    
    private String content;
    private MessageType type = MessageType.TEXT;
    
    @Field("is_read")
    private boolean isRead = false;
    
    @Field("read_at")
    private LocalDateTime readAt;
    
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public enum MessageType {
        TEXT, SYSTEM, IMAGE, FILE
    }
}
