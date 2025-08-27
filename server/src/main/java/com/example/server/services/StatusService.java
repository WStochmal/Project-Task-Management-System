package com.example.server.services;


import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.dto.status.StatusOrderDto;
import com.example.server.models.Project;
import com.example.server.models.Status;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.StatusRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class StatusService {

    private final ProjectRepository projectRepository;
    private final StatusRepository statusRepository;

    public StatusService(ProjectRepository projectRepository, StatusRepository statusRepository) {
        this.projectRepository = projectRepository;
        this.statusRepository = statusRepository;
    }


    public ResponseEntity<ApiResponse> createStatus(CreateStatusDto dto) {
        try
        {
            Project project = projectRepository.findById(dto.getProjectId()).orElse(null);

            if (project == null) {
                return ResponseEntity.ok().body(new ApiResponse(false, "Project not found",null));
            }

            Status newStatus = new Status();

            newStatus.setName(dto.getName());
            newStatus.setColor(dto.getColor());
            newStatus.setSortOrder(dto.getSortOrder());
            newStatus.setProject(project); // Associate the status with the project

            statusRepository.save(newStatus);

            ApiResponse response = new ApiResponse(true, "Status created successfully for project ID: " + dto.getProjectId(),newStatus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse errorResponse = new ApiResponse(false, "Error creating status: " + e.getMessage(),null);
            return ResponseEntity.status(500).body(errorResponse);
        }
    }


    public ResponseEntity<ApiResponse> deleteStatus(String id) {
        try {
            Status status = statusRepository.findById(id).orElse(null);
            if (status == null) {
                ApiResponse response = new ApiResponse(false, "Status not found", null);
                return ResponseEntity.ok().body(response);
            }
            statusRepository.delete(status);
            ApiResponse response = new ApiResponse(true, "Status deleted successfully", null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, "Failed to delete status: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }

    public ResponseEntity<ApiResponse> updateStatusesOrder(List<StatusOrderDto> statusOrders) {
        try {
            for (StatusOrderDto dto : statusOrders) {
                Status status = statusRepository.findById(dto.getId()).orElse(null);
                if (status != null) {
                    status.setSortOrder((short) dto.getSortOrder());
                }
            }
            statusRepository.saveAll(
                    statusOrders.stream()
                            .map(dto -> statusRepository.findById(dto.getId()).orElse(null))
                            .filter(Objects::nonNull)
                            .collect(Collectors.toList())
            );

            return ResponseEntity.ok(new ApiResponse(true, "Statuses reordered successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse(false, "Failed to update statuses order: " + e.getMessage(), null));
        }
    }
}
