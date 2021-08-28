package meds.bookaroo.gatewayservice.security;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

public class JwtAuthGatewayFilterFactory extends AbstractGatewayFilterFactory<JwtAuthGatewayFilterFactory.Config> {

  @Autowired
  private JwtTokenProvider tokenProvider;

  public JwtAuthGatewayFilterFactory() {
    super(Config.class);
  }

  private String getJWTFromRequest(String bearerToken) {
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SecurityConstant.TOKEN_PREFIX)) {
      return bearerToken.substring(7);
    }
    return null;
  }

  @Override
  public GatewayFilter apply(Config config) {
    return ((exchange, chain) -> {
      boolean authSuccess = false;
      String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
      try {
        String jwt = getJWTFromRequest(authHeader);
        if (jwt != null) {
          if (tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromJWT(jwt);
            exchange.getRequest().mutate().header("MEDS-User-Id", userId.toString());
            authSuccess = true;
          }
        }
      } catch (Exception e) {
        authSuccess = false;
      }

      if (authSuccess) {
        return chain.filter(exchange);
      } else {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap("{\"error\":\"Unauthorised\"}".getBytes())));
        return exchange.getResponse().setComplete();
      }
    });
  }

  @NoArgsConstructor
  @Setter
  @Getter
  public static class Config {

  }
}
