package meds.bookaroo.loginservice.jwt;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Autowired
    JwtProperties jwtProperties;

    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(jwtProperties.getSecretKey().getBytes());
    }

    public String createToken(String id, HttpServletRequest request) {
        Date now = new Date(System.currentTimeMillis());

        return Jwts.builder()
                .setSubject(id)
                .claim("id", id)
                .setIssuedAt(now)
                .setExpiration(calculateExpirationDate())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    private Date calculateExpirationDate() {
        Date now = new Date();
        return new Date(now.getTime() + jwtProperties.getValidityInMilliseconds());
    }
}
