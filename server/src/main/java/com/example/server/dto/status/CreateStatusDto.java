package com.example.server.dto.status;

public class CreateStatusDto {

    private String name;
    private String color;
    private short sortOrder;
    private long projectId; // Id of the project
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
        this.sortOrder = sortOrder;
    }

    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }





}
