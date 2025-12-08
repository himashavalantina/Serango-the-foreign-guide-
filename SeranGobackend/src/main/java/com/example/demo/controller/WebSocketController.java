package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    
    @Autowired
    private MessageService messageService;
    
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        return message;
    }
    
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSenderName());
        return message;
    }
    
    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload Message message) {
        // Save message to database
        messageService.sendMessage(
            message.getSenderId(),
            message.getReceiverId(),
            message.getContent(),
            message.getType()
        );
        
        // Send to specific user
        // This would require additional configuration for user-specific messaging
    }
}
