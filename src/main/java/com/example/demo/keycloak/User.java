package com.example.demo.keycloak;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User implements Serializable {
    private String pkid;
    private String userid;
    private String email;
    private String firatname;
    private String lastname;
    private String rate;
}
