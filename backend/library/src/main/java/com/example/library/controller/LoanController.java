package com.example.library.controller;

import com.example.library.entity.Loan;
import com.example.library.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:4200")
public class LoanController {

    @Autowired
    private LoanService loanService;

    // GET all loans
    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    // GET loan by ID
    @GetMapping("/{id}")
    public Loan getLoanById(@PathVariable Long id) {
        return loanService.getLoanById(id);
    }

    // POST issue a new book (create loan)
    @PostMapping
    public ResponseEntity<Loan> issueLoan(@RequestBody Map<String, Object> loanRequest) {
        try {
            Long bookId = Long.valueOf(loanRequest.get("bookId").toString());
            Long memberId = Long.valueOf(loanRequest.get("memberId").toString());
            String dueDateStr = loanRequest.get("dueDate").toString();
            
            Loan loan = loanService.issueLoan(bookId, memberId, dueDateStr);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT return a book
    @PutMapping("/{id}/return")
    public ResponseEntity<Loan> returnBook(@PathVariable Long id) {
        try {
            Loan loan = loanService.returnLoan(id);
            return ResponseEntity.ok(loan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DELETE a loan record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        try {
            loanService.deleteLoan(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
