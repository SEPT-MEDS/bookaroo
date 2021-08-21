package medsbookaroo.authservice.security;

import medsbookaroo.authservice.feignInterface.UserInterface;
import medsbookaroo.authservice.responseDTO.UserResponseDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomUserDetailsService {
    private UserInterface userInterface;

    public CustomUserDetailsService (UserInterface userInterface) {
        this.userInterface = userInterface;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserResponseDTO userResponseDTO = userInterface.fetchUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username "  + username + " not found"));

        List<GrantedAuthority> grantedAuthorities = userResponseDTO.getRoles()
                .stream().map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new User(String.join(username),
                userResponseDTO.getPassword(), true, true, true,
                true, grantedAuthorities);
    }
}
