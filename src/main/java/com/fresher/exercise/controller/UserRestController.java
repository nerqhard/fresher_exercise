package com.fresher.exercise.controller;

import com.fresher.exercise.entity.User;
import com.fresher.exercise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addUser")
    public ResponseEntity<List<User>> add(@RequestBody User user) {
        // add user to  userList
        userRepository.save(user);
        return ResponseEntity.ok(userRepository.findAll(new Sort(Sort.Direction.ASC, "id")));
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable("id") int id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(userRepository.findAll(new Sort(Sort.Direction.ASC, "id")));
    }
}
