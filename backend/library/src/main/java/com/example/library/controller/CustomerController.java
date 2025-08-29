package com.example.library.controller;

import com.example.library.entity.Member;
import com.example.library.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private MemberService memberService;

    // GET all customers (members)
    @GetMapping
    public List<Member> getAllCustomers() {
        return memberService.getAllMembers();
    }

    // GET customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Member> getCustomerById(@PathVariable Long id) {
        Member member = memberService.getMemberById(id);
        if (member != null) {
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }

    // POST a new customer
    @PostMapping
    public Member addCustomer(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    // PUT update a customer
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateCustomer(@PathVariable Long id, @RequestBody Member member) {
        Member existingMember = memberService.getMemberById(id);
        if (existingMember != null) {
            member.setId(id);
            Member updatedMember = memberService.saveMember(member);
            return ResponseEntity.ok(updatedMember);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE a customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        try {
            memberService.deleteMember(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET search customers by name
    @GetMapping("/search")
    public List<Member> searchCustomersByName(@RequestParam String name) {
        return memberService.searchMembersByName(name);
    }

    // GET customer by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Member> getCustomerByEmail(@PathVariable String email) {
        Member member = memberService.getMemberByEmail(email);
        if (member != null) {
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }
}
