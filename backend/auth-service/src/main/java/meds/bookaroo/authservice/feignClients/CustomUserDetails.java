package meds.bookaroo.authservice.feignClients;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
  private final Long id;
  private final String username;
  private final String password;
  private final String email;
  private final Boolean isEnabled;
  private final String type;
  private final String firstName;
  private final String lastName;
  private final String phoneNumber;
  private final String address;
  private final String ABN;

  // Not applicable to user details
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  // Not applicable to user details
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  // Not applicable to user details
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  // Not applicable to user details
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return isEnabled;
  }
}
