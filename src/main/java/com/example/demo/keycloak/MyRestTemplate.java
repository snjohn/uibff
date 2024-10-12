package com.example.demo.keycloak;

import org.springframework.security.oauth2.client.AuthorizedClientServiceOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

import java.security.Principal;
import java.util.Collections;
import java.util.Objects;

@Slf4j
public class MyRestTemplate extends RestTemplate {
    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";

    public MyRestTemplate(final AuthorizedClientServiceOAuth2AuthorizedClientManager authorizedClientServiceAndManager, Principal principal) {
        log.info("MyRestTemplate: Principal>>>>>>>>> "+principal);
        this.getInterceptors().add((request, body, execution) -> {
            OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId("keycloak")
                .principal(principal.getName())
                .build();
            OAuth2AuthorizedClient authorizedClient = authorizedClientServiceAndManager.authorize(authorizeRequest);
            final var token = Objects.requireNonNull(authorizedClient).getAccessToken().getTokenValue();
            request.getHeaders().put(AUTHORIZATION, Collections.singletonList(BEARER.concat(token)));
            return execution.execute(request, body);
        });
    }
}