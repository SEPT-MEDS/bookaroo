package meds.bookaroo.authservice.feignClients;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
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

  public CustomUserDetails(Long id, String username, String password, String email, Boolean isEnabled, String type, String firstName, String lastName, String phoneNumber, String address, String ABN) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.isEnabled = isEnabled;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.ABN = ABN;
  }

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
