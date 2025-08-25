package com.example.server.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(generator = "task-id")
    @GenericGenerator(
            name = "task-id",
            strategy = "com.example.server.utils.CustomIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "prefix", value = "task")
            }
    )
    private String id;
    private String name;
    private short sortOrder;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    @JsonBackReference
    private Status status;

}
