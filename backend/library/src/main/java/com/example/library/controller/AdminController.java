package com.example.library.controller;

import com.example.library.entity.User;
import com.example.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private UserService userService;

    // GET all admins (users)
    @GetMapping
    public List<User> getAllAdmins() {
        return userService.getAllUsers();
    }

    // GET admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getAdminById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    // POST a new admin
    @PostMapping
    public User addAdmin(@RequestBody User user) {
        return userService.createUser(user);
    }

    // PUT update an admin
    @PutMapping("/{id}")
    public ResponseEntity<User> updateAdmin(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE an admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
