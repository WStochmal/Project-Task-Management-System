package com.example.server.dto.project;

import java.time.LocalDateTime;

public class ProjectSummaryDto {
    private String id;
    private String name;
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    private boolean favorite;

    public ProjectSummaryDto() {}

    public ProjectSummaryDto(String id, String name, LocalDateTime createdAt, boolean favorite) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.favorite = favorite;
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