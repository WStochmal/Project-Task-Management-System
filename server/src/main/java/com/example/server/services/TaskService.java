package com.example.server.services;




import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.dto.task.CreateTaskDto;
import com.example.server.dto.task.MoveTaskDto;
import com.example.server.models.Project;
import com.example.server.models.Status;
import com.example.server.models.Task;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.StatusRepository;
import com.example.server.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@Service
public class TaskService {

    private final ProjectRepository projectRepository;
    private final StatusRepository statusRepository;
    private final TaskRepository taskRepository;

    public TaskService(ProjectRepository projectRepository, StatusRepository statusRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.statusRepository = statusRepository;
        this.taskRepository = taskRepository;
    }


    public ResponseEntity<ApiResponse> createTask(CreateTaskDto dto) {
        try {
            Status status = statusRepository.findById(dto.getStatusId()).orElse(null);

            if (status == null) {
                return ResponseEntity.ok().body(new ApiResponse(false, "Status not found", null));
            }

            Task newTask = new Task();
            newTask.setName(dto.getName());
            newTask.setSortOrder(dto.getSortOrder());
            newTask.setStatus(status); // Associate the task with the status

            taskRepository.save(newTask);
            ApiResponse response = new ApiResponse(true, "Task created successfully for status ID: " + dto.getStatusId(), newTask);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse errorResponse = new ApiResponse(false, "Error creating task: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(errorResponse);
        }
    }


    public ResponseEntity<ApiResponse> moveTask(MoveTaskDto dto) {
        Task task = taskRepository.findById(dto.getTaskId())
                .orElseThrow(() -> new EntityNotFoundException("Task not found: " + dto.getTaskId()));

        Status sourceStatus = statusRepository.findById(dto.getSourceStatusId())
                .orElseThrow(() -> new EntityNotFoundException("Source status not found: " + dto.getSourceStatusId()));

        Status targetStatus = statusRepository.findById(dto.getTargetStatusId())
                .orElseThrow(() -> new EntityNotFoundException("Target status not found: " + dto.getTargetStatusId()));


        // Remove task from source
        sourceStatus.getTasks().remove(task);

        // Add task to target at specified position (order)
        List<Task> targetTasks = targetStatus.getTasks();
        if (dto.getTargetSortOrder() >= targetTasks.size()) {
            targetTasks.add(task);
        } else {
            targetTasks.add(dto.getTargetSortOrder(), task);
        }

        // Update task's status reference
        task.setStatus(targetStatus);

        IntStream.range(0, sourceStatus.getTasks().size())
                .forEach(i -> sourceStatus.getTasks().get(i).setSortOrder((short) i));
        IntStream.range(0, targetStatus.getTasks().size())
                .forEach(i -> targetStatus.getTasks().get(i).setSortOrder((short) i));

        statusRepository.save(sourceStatus);
        statusRepository.save(targetStatus);
        taskRepository.save(task);

        return ResponseEntity.ok(new ApiResponse(true, "Task moved successfully", null));
    }

    public ResponseEntity<ApiResponse> deleteTask(String id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found: " + id));
        if (task == null) {
            ApiResponse response = new ApiResponse(false, "Task not found", null);
            return ResponseEntity.ok().body(response);
        }
        taskRepository.delete(task);
        ApiResponse response = new ApiResponse(true, "Task deleted successfully", null);
        return ResponseEntity.ok(response);
    }
}