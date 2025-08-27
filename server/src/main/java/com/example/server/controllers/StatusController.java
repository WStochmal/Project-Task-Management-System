package com.example.server.controllers;


import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.dto.status.StatusOrderDto;
import com.example.server.services.StatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @DeleteMapping("/status/delete/{id}")
    ResponseEntity<ApiResponse> deleteStatus(@PathVariable String id) {
        return statusService.deleteStatus(id);
    }
    @PutMapping("/status/update-order")
    public ResponseEntity<ApiResponse> updateStatusOrder(@RequestBody List<StatusOrderDto> statusOrders) {
        System.out.println("Received status order update request: " + statusOrders);
        return statusService.updateStatusesOrder(statusOrders);
    }
}