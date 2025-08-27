package com.example.server.services;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.project.ProjectSummaryDto;
import com.example.server.models.Project;
import com.example.server.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<ApiResponse> getAllProjects() {
        List<Project> projects = projectRepository.findAll();

        // Convert to ProjectSummaryDTO
        List<ProjectSummaryDto> projectSummaries = projects.stream()
                .map(project -> new ProjectSummaryDto(project.getId(), project.getName(),project.getCreatedAt(), project.isFavorite()))
                .toList();

        ApiResponse response = new ApiResponse(true, "Fetched all projects successfully", projectSummaries);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        ApiResponse response = new ApiResponse(true, "Fetched project successfully", project);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> deleteProjectById(String id) {
        if (!projectRepository.existsById(id)) {
            throw new EntityNotFoundException("Cannot delete. Project not found with id: " + id);
        }

        projectRepository.deleteById(id);
        ApiResponse response = new ApiResponse(true, "Project deleted successfully", null);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> createProject(Project project) {
        Project savedProject = projectRepository.save(project);
        ApiResponse response = new ApiResponse(true, "Project created successfully", savedProject);
        return ResponseEntity.ok(response);
    }
}