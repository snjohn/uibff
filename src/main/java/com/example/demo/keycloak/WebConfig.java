package com.example.demo.keycloak;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebConfig {

    @Value("${resource-uri}")
	String resourceUri;

	@Bean
	WebClient webClient(OAuth2AuthorizedClientManager authorizedClientManager) {
		ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2 = new ServletOAuth2AuthorizedClientExchangeFilterFunction(
				authorizedClientManager);
		oauth2.setDefaultOAuth2AuthorizedClient(true);
		// @formatter:off
		return WebClient.builder()
				.baseUrl(this.resourceUri)
				.apply(oauth2.oauth2Configuration())
				.build();
		// @formatter:on
	}

	@Bean
	OAuth2AuthorizedClientManager authorizedClientManager(ClientRegistrationRepository clientRegistrationRepository,
			OAuth2AuthorizedClientRepository authorizedClientRepository) {
		// @formatter:off
		OAuth2AuthorizedClientProvider authorizedClientProvider =
				OAuth2AuthorizedClientProviderBuilder.builder()
						.authorizationCode()
						.refreshToken()
						.clientCredentials()
						.password()
						.build();
		// @formatter:on
		DefaultOAuth2AuthorizedClientManager authorizedClientManager = new DefaultOAuth2AuthorizedClientManager(
				clientRegistrationRepository, authorizedClientRepository);
		authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

		return authorizedClientManager;
	}

    /*
    @Bean
    public WebClient oauthWebClient(
        final WebClient.Builder webClientBuilder,
        @Qualifier("authorizedClientManager") final ReactiveOAuth2AuthorizedClientManager manager) {
        final ExchangeStrategies exchangeStrategies =
            ExchangeStrategies.builder()
            //    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(EXCHANGE_BYTE_COUNT))
                .build();
        final ServerOAuth2AuthorizedClientExchangeFilterFunction oauth = new ServerOAuth2AuthorizedClientExchangeFilterFunction(manager);
        oauth.setDefaultClientRegistrationId("amrutapp-webui");
        // set more properties if needed
        // oauth.set ...

        return webClientBuilder
            .exchangeStrategies(exchangeStrategies)
            .baseUrl("http://localhost:8088")
            .filter(oauth)
            .build();
    }

    @Bean
    public ReactiveOAuth2AuthorizedClientManager authorizedClientManager(
        final ReactiveClientRegistrationRepository clientRegistrationRepository,
        final ReactiveOAuth2AuthorizedClientService authorizedClientService) {
        final ReactiveOAuth2AuthorizedClientProvider authorizedClientProvider =
            ReactiveOAuth2AuthorizedClientProviderBuilder
                .builder()
                .clientCredentials()
                .build();
        final AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager authorizedClientManager =
            new AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager(clientRegistrationRepository, authorizedClientService);
        authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);
        return authorizedClientManager;
    }
 */
}
