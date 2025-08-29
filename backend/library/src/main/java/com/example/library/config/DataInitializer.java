package com.example.library.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.library.entity.Book;
import com.example.library.entity.Member;
import com.example.library.entity.Role;
import com.example.library.entity.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.MemberRepository;
import com.example.library.repository.RoleRepository;
import com.example.library.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        if (roleRepository.count() == 0) {
            Role adminRole = new Role("ADMIN", "System Administrator");
            Role userRole = new Role("USER", "Regular User");
            Role librarianRole = new Role("LIBRARIAN", "Library Staff");
            
            roleRepository.save(adminRole);
            roleRepository.save(userRole);
            roleRepository.save(librarianRole);
            
            System.out.println("✅ Created default roles");
        }

        // Create test users if they don't exist
        if (userRepository.count() == 0) {
            Role adminRole = roleRepository.findByName("ADMIN").orElse(null);
            Role userRole = roleRepository.findByName("USER").orElse(null);
            
            // Create admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@library.com");
            Set<Role> adminRoles = new HashSet<>();
            if (adminRole != null) adminRoles.add(adminRole);
            admin.setRoles(adminRoles);
            userRepository.save(admin);
            
            // Create test user
            User testUser = new User();
            testUser.setUsername("user");
            testUser.setPassword(passwordEncoder.encode("user123"));
            testUser.setEmail("user@library.com");
            Set<Role> testUserRoles = new HashSet<>();
            if (userRole != null) testUserRoles.add(userRole);
            testUser.setRoles(testUserRoles);
            userRepository.save(testUser);
            
            System.out.println("✅ Created test users:");
            System.out.println("   👤 Username: admin, Password: admin123");
            System.out.println("   👤 Username: user, Password: user123");
        }
        
        // Create sample books
        if (bookRepository.count() == 0) {
            Book book1 = new Book();
            book1.setTitle("The Great Gatsby");
            book1.setAuthor("F. Scott Fitzgerald");
            book1.setIsbn("978-0-7432-7356-5");
            book1.setTotalCopies(5);
            book1.setAvailableCopies(5);
            book1.setStatus(Book.Status.AVAILABLE);
            bookRepository.save(book1);
            
            Book book2 = new Book();
            book2.setTitle("To Kill a Mockingbird");
            book2.setAuthor("Harper Lee");
            book2.setIsbn("978-0-06-112008-4");
            book2.setTotalCopies(3);
            book2.setAvailableCopies(3);
            book2.setStatus(Book.Status.AVAILABLE);
            bookRepository.save(book2);
            
            Book book3 = new Book();
            book3.setTitle("1984");
            book3.setAuthor("George Orwell");
            book3.setIsbn("978-0-452-28423-4");
            book3.setTotalCopies(4);
            book3.setAvailableCopies(4);
            book3.setStatus(Book.Status.AVAILABLE);
            bookRepository.save(book3);
            
            System.out.println("📚 Created sample books");
        }
        
        // Create sample members
        if (memberRepository.count() == 0) {
            Member member1 = new Member();
            member1.setName("John Doe");
            member1.setEmail("john.doe@example.com");
            member1.setPhone("123-456-7890");
            member1.setAddress("123 Main St, City, State");
            memberRepository.save(member1);
            
            Member member2 = new Member();
            member2.setName("Jane Smith");
            member2.setEmail("jane.smith@example.com");
            member2.setPhone("098-765-4321");
            member2.setAddress("456 Oak Ave, City, State");
            memberRepository.save(member2);
            
            System.out.println("👥 Created sample members");
        }
    }
}
