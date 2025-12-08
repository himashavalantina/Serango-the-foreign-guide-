package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import com.example.demo.service.UserService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestParam String receiverId,
                                             @RequestParam String content,
                                             @RequestParam(defaultValue = "TEXT") String type,
                                             Authentication authentication) {
        try {
            String email = authentication.getName();
            User sender = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String senderId = sender.getId();
            Message.MessageType messageType = Message.MessageType.valueOf(type.toUpperCase());
            Message message = messageService.sendMessage(senderId, receiverId, content, messageType);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(@RequestParam String userId1,
                                                        @RequestParam String userId2) {
        try {
            List<Message> messages = messageService.getConversation(userId1, userId2);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<List<Message>> getConversationById(@PathVariable String conversationId) {
        try {
            List<Message> messages = messageService.getConversationByConversationId(conversationId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-messages")
    public ResponseEntity<List<Message>> getMyMessages(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            List<Message> messages = messageService.getUserMessages(userId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Message>> getUnreadMessages(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            List<Message> messages = messageService.getUnreadMessages(userId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadMessageCount(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            long count = messageService.getUnreadMessageCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{messageId}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable String messageId, 
                                            Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            Message message = messageService.markAsRead(messageId, userId);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/conversation/{conversationId}/read")
    public ResponseEntity<Void> markConversationAsRead(@PathVariable String conversationId, 
                                                      Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
            String userId = user.getId();
            messageService.markConversationAsRead(conversationId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
