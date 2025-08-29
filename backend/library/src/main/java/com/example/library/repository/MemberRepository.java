package com.example.library.repository;

import com.example.library.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    @Query("SELECT m FROM Member m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Member> findByNameContainingIgnoreCase(@Param("name") String name);
    
    Optional<Member> findByEmail(String email);
}
