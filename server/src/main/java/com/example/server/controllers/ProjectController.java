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
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable("id") Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public Project createTask(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }


}
