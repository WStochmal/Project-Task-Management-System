package com.example.server.dto.project;

public class ProjectSummaryDto {
    private String id;
    private String name;

    public ProjectSummaryDto() {}

    public ProjectSummaryDto(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}