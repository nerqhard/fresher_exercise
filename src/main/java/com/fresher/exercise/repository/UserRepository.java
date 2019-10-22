package com.fresher.exercise.repository;

import com.fresher.exercise.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

   List<User> findAllByOrderByIdDesc();
   List<User> findAllByOrderByIdAsc();
}
