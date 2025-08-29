package com.example.library.controller;

import com.example.library.entity.Member;
import com.example.library.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:4200")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // GET all members
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    // GET member by ID
    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    // POST a new member
    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    // PUT update a member
    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Long id, @RequestBody Member member) {
        member.setId(id);
        return memberService.saveMember(member);
    }

    // DELETE a member
    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
    }
}
