package com.fresher.exercise.controller;

import com.fresher.exercise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/crud")
public class CrudController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = {"/listUser", "/"})
    public String list(Model model) {
        model.addAttribute("userList", userRepository.findAllByOrderByIdAsc());
        return "listUserDB";
    }
//
//    @GetMapping("/addUser")
//    public String add(Model model) {
//        // add user to  model
//        model.addAttribute("user", new User());
//        // return Template addUser.html
//        return "addUser";
//    }
//
//    @PostMapping("/addUser")
//    public String add(User user) {
//        // add user to  userList
//        userRepository.save(user);
//        return "redirect:/crud/listUser";
//    }
//
//
//    //
//    @GetMapping("/editUser/{id}")
//    public String edit(@PathVariable("id") int id, Model model) {
//        User user = userRepository.getOne(id);
//        model.addAttribute("user", user);
//        return "editUser";
//    }
//
//    @PostMapping("/editUser")
//    public String update(User user) {
//        userRepository.save(user);
//        return "redirect:/crud/listUser";
//    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userRepository.deleteById(id);
        return "redirect:/crud/listUser";
    }
}