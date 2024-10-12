package com.example.demo;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
//import org.springframework.security.oauth2.server.resource.web.reactive.function.client.ServletBearerExchangeFilterFunction;
import org.springframework.web.client.RestTemplate;
//import org.springframework.web.reactive.function.client.WebClient;

//import com.example.demo.keycloak.MyRestTemplate;
//import com.example.demo.keycloak.TokenInterceptor;

@SpringBootApplication
@EnableWebSecurity
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
/*
    @Bean
    RestTemplate rest() {
        RestTemplate rest = new RestTemplate();
        rest.getInterceptors().add((request, body, execution) -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                return execution.execute(request, body);
            }

            if (!(authentication.getCredentials() instanceof AbstractOAuth2Token)) {
                return execution.execute(request, body);
            }

            AbstractOAuth2Token token = (AbstractOAuth2Token) authentication.getCredentials();
            request.getHeaders().setBearerAuth(token.getTokenValue());
            return execution.execute(request, body);
        });
        return rest;
    }
 */
    @Bean
    RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
 //       restTemplate.setInterceptors(Collections.singletonList(new TokenInterceptor()));
        return restTemplate;
    }

/*
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .filter(new ServletBearerExchangeFilterFunction())
            .build();
    }
*/
}
