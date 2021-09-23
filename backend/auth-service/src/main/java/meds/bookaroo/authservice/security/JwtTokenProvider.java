package meds.bookaroo.authservice.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import meds.bookaroo.authservice.feignClients.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

  // Generate the token
  public String generateToken(Authentication authentication) {
    // Generate claim data
    CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
    Date now = new Date(System.currentTimeMillis());
    Date expiryDate = new Date(now.getTime() + SecurityConstant.EXPIRATION_TIME);
    String userId = Long.toString(user.getId());

    // Set token claims
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", (Long.toString(user.getId())));
    claims.put("username", user.getUsername());

    // Build JWT Token
    return Jwts.builder()
        .setSubject(userId)
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS512, SecurityConstant.SECRET)
        .compact();
  }
}
