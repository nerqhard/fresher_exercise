package com.fresher.exercise.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int id;

    @Column(name = "name_city")
    private String nameCity;

    @Column(name = "name_country")
    private String nameCountry;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY)
    private Set<User> listUser;
}
