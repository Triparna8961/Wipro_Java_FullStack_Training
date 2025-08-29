package com.example.library.service;

import com.example.library.entity.User;
import com.example.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean isValidToken(String token) {
        // Simple token validation for demo
        return token != null && token.startsWith("demo-token-");
    }

    public String extractUsernameFromToken(String token) {
        if (token != null && token.startsWith("demo-token-")) {
            return token.substring("demo-token-".length());
        }
        return null;
    }
}
