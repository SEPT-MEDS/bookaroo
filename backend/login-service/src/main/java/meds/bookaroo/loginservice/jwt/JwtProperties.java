package meds.bookaroo.loginservice.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtProperties {
    private String secretKey;
    private long validityInMilliseconds;

    public String getSecretKey() {
        return secretKey;
    }

    public long getValidityInMilliseconds() {
        return validityInMilliseconds;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public void setValidityInMilliseconds(long validityInMilliseconds) {
        this.validityInMilliseconds = validityInMilliseconds;
    }
}
