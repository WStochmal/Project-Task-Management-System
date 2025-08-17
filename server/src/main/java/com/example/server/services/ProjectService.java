package com.example.server.services;


import com.example.server.dto.ApiResponse;
import com.example.server.dto.project.ProjectSummaryDto;
import com.example.server.models.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.server.repository.ProjectRepository;

@Service

public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }



    public ResponseEntity<ApiResponse> getAllProjects() {
        try {
            List<Project> projects = projectRepository.findAll();

            // Convert to ProjectSummaryDTO
            List<ProjectSummaryDto> projectSummaries = projects.stream()
                    .map(project -> new ProjectSummaryDto(project.getId(), project.getName()))
                    .toList();

            for (ProjectSummaryDto summary : projectSummaries) {
                System.out.println("Project ID: " + summary.getId() + ", Name: " + summary.getName());
            }

            ApiResponse response = new ApiResponse(true, "Fetched all projects successfully", projectSummaries);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, "Failed to fetch projects: " + e.getMessage(),null);
            return ResponseEntity.status(500).body(response);
        }
    }

    public ResponseEntity<ApiResponse> getProjectById (long id)
    {
        try {
            Project project = projectRepository.findById(id).orElse(null);
            if (project == null) {
                ApiResponse response = new ApiResponse(false, "Project not found", null);
                return ResponseEntity.ok().body(response);
            }
            ApiResponse response = new ApiResponse(true, "Fetched project successfully", project);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, "Failed to fetch project: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response);
        }
    }
}
