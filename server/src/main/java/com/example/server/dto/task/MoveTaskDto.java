package com.example.server.dto.task;

public class MoveTaskDto {


    private String taskId;
    private String sourceStatusId;
    private String targetStatusId;
    private int targetSortOrder;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getSourceStatusId() {
        return sourceStatusId;
    }

    public void setSourceStatusId(String sourceStatusId) {
        this.sourceStatusId = sourceStatusId;
    }

    public String getTargetStatusId() {
        return targetStatusId;
    }

    public void setTargetStatusId(String targetStatusId) {
        this.targetStatusId = targetStatusId;
    }

    public int getTargetSortOrder() {
        return targetSortOrder;
    }

    public void setTargetSortOrder(int targetSortOrder) {
        this.targetSortOrder = targetSortOrder;
    }
}
