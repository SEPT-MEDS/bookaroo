package meds.bookaroo.authservice.security;

public class SecurityConstant {

  public static final String SECRET = "SecretKeyToGenJWTs";
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final long EXPIRATION_TIME = 86_400_000; // A day
}
