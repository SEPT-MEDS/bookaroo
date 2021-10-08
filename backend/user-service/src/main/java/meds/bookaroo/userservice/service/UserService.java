package meds.bookaroo.userservice.service;

import meds.bookaroo.userservice.feignClients.Review;
import meds.bookaroo.userservice.feignClients.ReviewClient;
import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  @Autowired private UserRepository userRepository;
  @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired private ReviewClient userReviewClient;

  public UserService(UserRepository userRepository, ReviewClient userReviewClient, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.userReviewClient = userReviewClient;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  public User getById(Long id) {
    User user = userRepository.findById(id).orElse(null);
    if (user != null) {
      user.setRating(userReviewClient.getAvgUserReviews(user.getId()));
    }
    return user;
  }

  public List<User> getAll() { return userRepository.findAll(); }

  public User create(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public void deleteById(Long id) {
    userRepository.deleteById(id);
  }

  public User getByUsername(String username) {
    User user = userRepository.findByUsername(username).orElse(null);
    if (user != null) {
      user.setRating(userReviewClient.getAvgUserReviews(user.getId()));
    }
    return user;
  }

  public User getByEmail(String email) {
    User user = userRepository.findByEmail(email).orElse(null);
    if (user != null) {
      user.setRating(userReviewClient.getAvgUserReviews(user.getId()));
    }
    return user;
  }

  public void save(User user) {
    userRepository.save(user);
  }
}
