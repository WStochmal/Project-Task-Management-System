package com.example.server.controllers;


import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.services.StatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class StatusController {
    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @PostMapping("/status/create")
    ResponseEntity<ApiResponse> createStatus(@RequestBody CreateStatusDto dto) {
      return statusService.createStatus(dto);
    }
}