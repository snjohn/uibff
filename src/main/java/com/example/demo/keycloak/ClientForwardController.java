package com.example.demo.keycloak;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientForwardController {
    /*
     * Add the following in application.properties
     * spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
     */
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() { 
        return "forward:/";
    }
}