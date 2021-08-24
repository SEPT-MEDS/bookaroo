package meds.bookaroo.userservice.service;

import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void create(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}