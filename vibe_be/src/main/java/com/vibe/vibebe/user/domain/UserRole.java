package com.vibe.vibebe.user.domain;

public enum UserRole {
    USER,
    ADMIN;

    public String getAuthority() {
        return "ROLE_" + name();
    }
}
