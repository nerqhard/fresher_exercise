package com.fresher.exercise.controller;

import com.fresher.exercise.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    // use List instead of Database
    List<User> userList = new ArrayList<>();

    @GetMapping(value = {"/listUser", "/"})
    public String list(Model model) {
        model.addAttribute("userList", userList);
        // return Template listUser.html
        return "listUser";
    }

    @GetMapping("/addUser")
    public String add(Model model) {
        // add user to  model
        model.addAttribute("user", new User());
        // return Template addUser.html
        return "addUser";
    }

    @PostMapping("/addUser")
    public String add(User user) {
        // add user to  userList
        user.setId(userList.size() + 1);
        userList.add(user);
        return "redirect:/listUser";
    }

    @GetMapping("/editUser/{id}")
    public String edit(@PathVariable("id") int id, Model model) {
        for (User user : userList) {
            if (user.getId() == id) {
                model.addAttribute("user", user);
                break;
            }
        }
        return "/editUser";
    }

    @PostMapping("/editUser")
    public String update(User user) {

        for (User u : userList) {
            if (u.getId() == user.getId()) {
                u.setName(user.getName());
                u.setAge(user.getAge());
            }
        }

        return "redirect:/listUser";
    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id, Model model) {
        if (id == 0 || String.valueOf(id).isEmpty()) {
            model.addAttribute("nullId", "nullId");

            return "redirect:/listUser";
        }

        for (int i = 0; i <userList.size() ; i++) {
            if (userList.get(i).getId() == id) {
                userList.remove(userList.get(i));
            }
        }

        return "redirect:/listUser";
    }

}
