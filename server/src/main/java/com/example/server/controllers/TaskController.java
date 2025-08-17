package com.example.server.controllers;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.dto.task.CreateTaskDto;
import com.example.server.models.Task;
import com.example.server.repository.TaskRepository;
import com.example.server.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/project")

public class TaskController {
    private final TaskService taskService;

    public TaskController( TaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping("/task/create")
    ResponseEntity<ApiResponse> createTask(@RequestBody CreateTaskDto dto) {
        return taskService.createTask(dto);
    }

}
