package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripRequest {
    
    @NotBlank(message = "Destination is required")
    private String destination;
    
    @NotNull(message = "Arrival date is required")
    private LocalDateTime arrivalDate;
    
    @NotNull(message = "Departure date is required")
    private LocalDateTime departureDate;
    
    @Min(value = 1, message = "Group size must be at least 1")
    private int groupSize;
    
    @NotBlank(message = "Budget is required")
    private String budget;
    
    private List<String> interests;
    private String additionalPreferences;
}
