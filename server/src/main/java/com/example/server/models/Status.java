package com.example.server.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Status {
    @Id
    @GeneratedValue(generator = "status-id")
    @GenericGenerator(
            name = "status-id",
            strategy = "com.example.server.utils.CustomIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "prefix", value = "status")
            }
    )
    private String id;
    private String name;
    private String color;
    private short sortOrder;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @JsonBackReference
    private Project project;

    @OneToMany(mappedBy = "status", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Task> tasks = new ArrayList<>();
}
