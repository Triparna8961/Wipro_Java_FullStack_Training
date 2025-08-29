package com.example.library.service;

import com.example.library.entity.Book;
import com.example.library.entity.Loan;
import com.example.library.entity.Member;
import com.example.library.enums.LoanStatus;
import com.example.library.repository.BookRepository;
import com.example.library.repository.LoanRepository;
import com.example.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElse(null);
    }

    public Loan issueLoan(Long bookId, Long memberId, String dueDateStr) {
        try {
            // Find book and member
            Optional<Book> bookOpt = bookRepository.findById(bookId);
            Optional<Member> memberOpt = memberRepository.findById(memberId);
            
            if (!bookOpt.isPresent()) {
                throw new RuntimeException("Book not found");
            }
            
            if (!memberOpt.isPresent()) {
                throw new RuntimeException("Member not found");
            }
            
            Book book = bookOpt.get();
            Member member = memberOpt.get();
            
            // Check if book is available
            if (Book.Status.ISSUED.equals(book.getStatus())) {
                throw new RuntimeException("Book is already issued");
            }
            
            // Create new loan
            Loan loan = new Loan();
            loan.setBook(book);
            loan.setMember(member);
            loan.setLoanDate(LocalDateTime.now());
            
            // Parse due date
            LocalDate dueDate = LocalDate.parse(dueDateStr);
            loan.setDueDate(dueDate.atStartOfDay());
            
            loan.setStatus(LoanStatus.BORROWED);
            
            // Update book status
            book.setStatus(Book.Status.ISSUED);
            bookRepository.save(book);
            
            // Save loan
            return loanRepository.save(loan);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to issue loan: " + e.getMessage());
        }
    }

    public Loan returnLoan(Long loanId) {
        try {
            Optional<Loan> loanOpt = loanRepository.findById(loanId);
            if (!loanOpt.isPresent()) {
                throw new RuntimeException("Loan not found");
            }
            
            Loan loan = loanOpt.get();
            
            // Update loan
            loan.setReturnDate(LocalDateTime.now());
            loan.setStatus(LoanStatus.RETURNED);
            
            // Update book status
            Book book = loan.getBook();
            if (book != null) {
                book.setStatus(Book.Status.AVAILABLE);
                bookRepository.save(book);
            }
            
            return loanRepository.save(loan);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to return loan: " + e.getMessage());
        }
    }

    public void deleteLoan(Long id) {
        try {
            Optional<Loan> loanOpt = loanRepository.findById(id);
            if (loanOpt.isPresent()) {
                Loan loan = loanOpt.get();
                
                // If loan is still active, make book available
                if (LoanStatus.BORROWED.equals(loan.getStatus()) && loan.getBook() != null) {
                    Book book = loan.getBook();
                    book.setStatus(Book.Status.AVAILABLE);
                    bookRepository.save(book);
                }
                
                loanRepository.deleteById(id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete loan: " + e.getMessage());
        }
    }

    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }
    
    public List<Loan> getLoansByMemberId(Long memberId) {
        return loanRepository.findByMemberId(memberId);
    }
    
    public List<Loan> getLoansByBookId(Long bookId) {
        return loanRepository.findByBookId(bookId);
    }
    
    public List<Loan> getOverdueLoans() {
        return loanRepository.findOverdueLoans(LocalDateTime.now(), LoanStatus.BORROWED);
    }
    
    public List<Loan> getLoansByStatus(LoanStatus status) {
        return loanRepository.findByStatus(status);
    }
}
