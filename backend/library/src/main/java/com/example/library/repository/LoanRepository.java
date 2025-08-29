package com.example.library.repository;

import com.example.library.entity.Loan;
import com.example.library.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    
    List<Loan> findByMemberId(Long memberId);
    
    List<Loan> findByBookId(Long bookId);
    
    @Query("SELECT l FROM Loan l WHERE l.dueDate < :currentDate AND l.status = :status")
    List<Loan> findOverdueLoans(@Param("currentDate") LocalDateTime currentDate, @Param("status") LoanStatus status);
    
    List<Loan> findByStatus(LoanStatus status);
}
