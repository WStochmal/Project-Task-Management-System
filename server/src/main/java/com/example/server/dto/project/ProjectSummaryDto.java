package com.example.server.dto.project;

public class ProjectSummaryDto {
    private long id;
    private String name;

    public ProjectSummaryDto() {}

    public ProjectSummaryDto(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}