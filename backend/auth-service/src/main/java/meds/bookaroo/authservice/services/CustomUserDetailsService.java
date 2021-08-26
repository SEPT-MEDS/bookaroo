package meds.bookaroo.authservice.services;

import meds.bookaroo.authservice.feignClients.CustomUserDetails;
import meds.bookaroo.authservice.feignClients.UserClient;
import meds.bookaroo.authservice.responseDTO.UserResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserClient userClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserResponseDTO res = userClient.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found!"));
        return new CustomUserDetails(username, res.getPassword(), res.getId());
    }
}
