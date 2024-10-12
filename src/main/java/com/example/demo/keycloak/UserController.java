package com.example.demo.keycloak;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private WebClient webClient;

    @Autowired
    private RestTemplate restTemplate;

	public UserController(WebClient webClient) {
		super();
        this.webClient = webClient;
        log.info("Initialized UserController......");
	}

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, Principal principal) throws Exception {
        log.info("Logging out user: "+principal.getName());
        request.logout();
        //return "redirect:/";
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, List<User>>> fetchAllUsers(Principal principal ) {
        Map<String, List<User>> userMap = new HashMap<>();
        List<User> users = new ArrayList<>();
        users.add(new User("1", "john", "sjjohn@dm.gov.ae", "Simon", "John", "280"));
        users.add(new User("2", "admin", "sjjohn@dm.gov.ae", "Administrator", "Admin", "290"));
        users.add(new User("3", "maher", "maneamatolla@dm.gov.ae", "Maher", "Ahmad", "300"));
        users.add(new User("4", "salem", "smsalem@dm.gov.ae", "Salem", "Bedwawi", "350"));
        users.add(new User("5", "athiyeh", "aawahab@dm.gov.ae", "Tariq", "Ali", "200"));
        users.add(new User("6", "sara", "sdmarkhan@dm.gov.ae", "Sara", "Markhan", "230"));
        users.add(new User("7", "amna", "amsharif@dm.gov.ae", "Amna", "Sharif", "250"));
        users.add(new User("8", "sudqi", "sanameh@dm.gov.ae", "Sudqi", "Nameh", "210"));
        users.add(new User("9", "waddah", "wmmishah@dm.gov.ae", "Waddah", "Mishah", "270"));
        users.add(new User("14", "zaffin", "alzaffin@dm.gov.ae", "Zaffin", "Mohammed", "400"));
        users.add(new User("15", "hazarooni", "hazarooni@dm.gov.ae", "Huda", "Zarooni", "300"));
        users.add(new User("16", "nagergawi", "nagergawi@dm.gov.ae", "Noora", "Gergawi", "250"));
        users.add(new User("17", "amhaj", "amhaj@dm.gov.ae", "Abeer", "Haj", "260"));
        users.add(new User("18", "nehai", "nehai@dm.gov.ae", "Noora", "Hai", "220"));
        users.add(new User("19", "aaabdulla1", "aaabdulla1@dm.gov.ae", "Ahmed", "Abdulla", "190"));
        users.add(new User("20", "nsarjumand", "nsarjumand@dm.gov.ae", "Nazli", "Arjumand", "250"));
        users.add(new User("21", "ybdaniel", "ybdaniel@dm.gov.ae", "Jack", "Daniel", "320"));
        users.add(new User("23", "mamunshar", "mamunshar@dm.gov.ae", "Mohammed", "Akram", "200"));

        userMap.put("data", users);
        log.info("UserController.fetchAllUsers()>> Principal: {} and returning {} users", principal.getName(), users.size());
        
        return ResponseEntity.ok(userMap);
    }	

    @GetMapping("/remote/all")
    public ResponseEntity<Map<String, List<User>>> fetchAllUsersRemote(Principal principal ) {

        Map<String, List<User>> userMap = new HashMap<>();

        log.info("UserController.fetchAllUsersRemote()>> Principal: {} ", principal.getName());
        List<User> users = webClient
        .get()
        .uri("/api/gateway/all")
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<User>>() {})
        .block();
        userMap.put("data", users);
        

        // try {
        //     final ResponseEntity<List<User>> responseEntity = restTemplate.exchange("http://gatewayserver:8088/api/gateway/all",
        //             HttpMethod.GET, HttpEntity.EMPTY, new ParameterizedTypeReference<List<User>>() {});

        //     userMap.put("data", responseEntity.getBody());
            
        // } catch (RestClientException e) {
        //     // TODO: handle exception
        //     log.info("UserController.fetchAllUsersRemote>>RestClientException: "+e.getMessage(), e);
        // }        
        return ResponseEntity.ok(userMap);
    }
    
    @GetMapping(value = "/token")
    public Mono<String> getHome(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
        return Mono.just(authorizedClient.getAccessToken().getTokenValue());
    }
}