package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {

    @Value("${spring.data.mongodb.uri:mongodb+srv://himasha:hima123456@cluster0.ko8ohua.mongodb.net/serango?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-256&authSource=admin}")
    private String mongoUri;

    @Bean
    public MongoClient mongoClient() {
        System.out.println("🔧 Using MongoDB URI: " + mongoUri);
        return MongoClients.create(mongoUri);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, "serango");
    }
}