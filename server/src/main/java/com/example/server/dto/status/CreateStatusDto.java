package com.example.server.dto.status;

public class CreateStatusDto {

    private String name;
    private String color;
    private short sortOrder;
    private String projectId; // Id of the project
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public short getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(short order) {
        this.sortOrder = order;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }





}
