package meds.bookaroo.authservice.services;

import meds.bookaroo.authservice.feignClients.CustomUserDetails;
import meds.bookaroo.authservice.feignClients.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired private UserClient userClient;

  @Override
  public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // Retrieve user based on their username
    CustomUserDetails res =
        userClient
            .getUserByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException("Username: " + username + " not found!"));
    return res;
  }
}
