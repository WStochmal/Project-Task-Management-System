package com.example.server.dto.task;

public class CreateTaskDto {
    private String name;
    private short sortOrder;
    private long statusId; // Id of the service

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(short sortOrder) {
        this.sortOrder = sortOrder;
    }

    public long getStatusId() {
        return statusId;
    }

    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }
}
