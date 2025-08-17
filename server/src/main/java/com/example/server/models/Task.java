package com.example.server.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private short sortOrder;

    @ManyToOne
    @JoinColumn(name = "status_id")
    @JsonBackReference
    private Status status;
}
