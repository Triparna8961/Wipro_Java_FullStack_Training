package com.example.library.controller;

import com.example.library.dto.AuthRequest;
import com.example.library.dto.AuthResponse;
import com.example.library.entity.User;
import com.example.library.service.AuthService;
import com.example.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // Use AuthService for proper authentication with password encoding
            User user = authService.authenticate(authRequest.getUsername(), authRequest.getPassword());
            
            if (user != null) {
                // Create a simple token (in production, use JWT)
                String token = "demo-token-" + user.getUsername();
                AuthResponse response = new AuthResponse(token, user);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Basic validation
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            
            User savedUser = userService.createUser(user);
            String token = "demo-token-" + savedUser.getUsername();
            AuthResponse response = new AuthResponse(token, savedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is working!");
    }
}
