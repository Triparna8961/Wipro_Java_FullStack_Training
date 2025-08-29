package com.example.library.dto;

import com.example.library.entity.User;

public class AuthResponse {
    private String token;
    private User user;

    public AuthResponse() {}

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
        // Clear password for security
        if (this.user != null) {
            this.user.setPassword(null);
        }
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        // Clear password for security
        if (this.user != null) {
            this.user.setPassword(null);
        }
    }
}
