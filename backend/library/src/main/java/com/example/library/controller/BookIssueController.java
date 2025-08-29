package com.example.library.controller;

import com.example.library.entity.Loan;
import com.example.library.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book-issues")
@CrossOrigin(origins = "http://localhost:4200")
public class BookIssueController {

    @Autowired
    private LoanService loanService;

    // GET all book issues (loans)
    @GetMapping
    public List<Loan> getAllBookIssues() {
        return loanService.getAllLoans();
    }

    // GET book issue by ID
    @GetMapping("/{id}")
    public ResponseEntity<Loan> getBookIssueById(@PathVariable Long id) {
        Loan loan = loanService.getLoanById(id);
        if (loan != null) {
            return ResponseEntity.ok(loan);
        }
        return ResponseEntity.notFound().build();
    }

    // GET book issues by customer ID
    @GetMapping("/customer/{customerId}")
    public List<Loan> getBookIssuesByCustomerId(@PathVariable Long customerId) {
        return loanService.getLoansByMemberId(customerId);
    }

    // GET book issues by book ID
    @GetMapping("/book/{bookId}")
    public List<Loan> getBookIssuesByBookId(@PathVariable Long bookId) {
        return loanService.getLoansByBookId(bookId);
    }

    // GET overdue book issues
    @GetMapping("/overdue")
    public List<Loan> getOverdueBookIssues() {
        return loanService.getOverdueLoans();
    }

    // POST issue a book
    @PostMapping("/issue")
    public ResponseEntity<Loan> issueBook(
            @RequestParam Long bookId, 
            @RequestParam Long customerId, 
            @RequestParam String dueDate) {
        try {
            Loan loan = loanService.issueLoan(bookId, customerId, dueDate);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT return a book
    @PutMapping("/return/{bookIssueId}")
    public ResponseEntity<Loan> returnBook(@PathVariable Long bookIssueId) {
        try {
            Loan loan = loanService.returnLoan(bookIssueId);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
