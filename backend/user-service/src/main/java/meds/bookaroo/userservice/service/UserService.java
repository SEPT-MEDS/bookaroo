package meds.bookaroo.userservice.service;

import meds.bookaroo.userservice.exception.UsernameAlreadyExistsException;
import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            System.out.println(user.getPassword());
            System.out.println(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setUsername(user.getUsername());
            user.setConfirmPassword("");
            return repository.save(user);
        } catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '" + user.getUsername() + "' already exists");
        }
    }

    public Optional<User> getUserWithId(Long userid) {
        return repository.findById(userid);
    }

    public User getUserWithUsername(String username) { return repository.findByUsername(username); }

    public void deleteUserWithId(long userid) {
        repository.deleteById(userid);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
