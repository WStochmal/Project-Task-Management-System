package com.example.server.controllers;

import com.example.server.dto.ApiResponse;
import com.example.server.models.Project;
import com.example.server.repository.ProjectRepository;
import com.example.server.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectRepository projectRepository;
    private final ProjectService projectService;

    public ProjectController(ProjectRepository projectRepository, ProjectService projectService) {
        this.projectRepository = projectRepository;
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable("id") String id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createTask(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable String id) {
        return projectService.deleteProjectById(id);
    }
}
