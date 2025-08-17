package com.example.server.services;




import com.example.server.dto.ApiResponse;
import com.example.server.dto.status.CreateStatusDto;
import com.example.server.dto.task.CreateTaskDto;
import com.example.server.models.Project;
import com.example.server.models.Status;
import com.example.server.models.Task;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.StatusRepository;
import com.example.server.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        try
        {


            Status status = statusRepository.findById(dto.getStatusId()).orElse(null);

            if (status == null) {
                return ResponseEntity.ok().body(new ApiResponse(false, "Status not found",null));
            }

            Task newTask = new Task();
            newTask.setName(dto.getName());
            newTask.setSortOrder(dto.getSortOrder());
            newTask.setStatus(status); // Associate the task with the status

            taskRepository.save(newTask);
            ApiResponse response = new ApiResponse(true, "Task created successfully for status ID: " + dto.getStatusId(),newTask);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse errorResponse = new ApiResponse(false, "Error creating status: " + e.getMessage(),null);
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
