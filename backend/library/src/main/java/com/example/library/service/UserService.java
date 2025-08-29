package com.example.library.service;

import com.example.library.entity.Role;
import com.example.library.entity.User;
import com.example.library.repository.RoleRepository;
import com.example.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Save new user
    public User saveUser(User user) {
        // Encode password if it's not already encoded
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        // Fetch managed Role entities before saving
        if (user.getRoles() != null) {
            Set<Role> managedRoles = user.getRoles().stream()
                    .map(role -> roleRepository.findById(role.getId())
                            .orElseThrow(() -> new RuntimeException("Role not found: " + role.getId())))
                    .collect(Collectors.toSet());
            user.setRoles(managedRoles);
        }
        return userRepository.save(user);
    }

    // Update existing user
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setUsername(user.getUsername());
        // Only update password if it's provided and encode it
        if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        existingUser.setEmail(user.getEmail());

        if (user.getRoles() != null) {
            Set<Role> managedRoles = user.getRoles().stream()
                    .map(role -> roleRepository.findById(role.getId())
                            .orElseThrow(() -> new RuntimeException("Role not found: " + role.getId())))
                    .collect(Collectors.toSet());
            existingUser.setRoles(managedRoles);
        }

        return userRepository.save(existingUser);
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Find user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Create new user
    public User createUser(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists: " + user.getUsername());
        }
        
        // Encode password
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        // For new registrations, assign default USER role
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Role userRole = roleRepository.findByName("USER").orElse(null);
            if (userRole != null) {
                Set<Role> defaultRoles = new HashSet<>();
                defaultRoles.add(userRole);
                user.setRoles(defaultRoles);
            }
        }
        
        return userRepository.save(user);
    }
}
