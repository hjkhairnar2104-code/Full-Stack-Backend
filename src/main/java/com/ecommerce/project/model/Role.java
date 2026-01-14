package com.ecommerce.project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long Roleid;

    @ToString.Exclude
    @Enumerated(EnumType.STRING)
    @Column(length = 20,name = "role_name")
    private AppRole roleName;

    public Role(AppRole roleName) {
        this.roleName = roleName;
    }


}
