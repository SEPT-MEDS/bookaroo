package meds.bookaroo.userservice;

import meds.bookaroo.userservice.feignClients.ReviewClient;
import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.model.UserType;
import meds.bookaroo.userservice.repository.UserRepository;
import meds.bookaroo.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

  UserService userService;
  BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

  @Mock UserRepository userRepository;

  @Mock
  ReviewClient userReviewClient;

  @BeforeEach
  void initUseCase() {
    userService = new UserService(userRepository, userReviewClient, bCryptPasswordEncoder);
  }

  @Test
  public void getValidUserByUsername() {
    User user =
        new User(
            1L,
            "test",
            "username",
            "password",
            true,
            UserType.CUSTOMER,
            "firstName",
            "lastName",
            0,
            "",
            "",
            "");
    when(userRepository.findByUsername("username")).thenReturn(java.util.Optional.of(user));
    when(userReviewClient.getAvgUserReviews(1L)).thenReturn(5);
    assertNotNull(userService.getByUsername("username"));
  }

  @Test
  public void getValidUserById() {
    User user =
        new User(
            1L,
            "test",
            "username",
            "password",
            true,
            UserType.CUSTOMER,
            "firstName",
            "lastName",
            0,
            "",
            "",
            "");
    when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));
    when(userReviewClient.getAvgUserReviews(1L)).thenReturn(5);
    assertNotNull(userService.getById(1L));
  }

  @Test
  public void getInvalidUserById() {
    when(userRepository.findById(1L)).thenReturn(java.util.Optional.empty());
    assertNull(userService.getById(1L));
  }

  @Test
  public void getInvalidUserByUsername() {
    when(userRepository.findByUsername("username")).thenReturn(java.util.Optional.empty());
    assertNull(userService.getByUsername("username"));
  }

  @Test
  public void createUser() {
    User user =
        new User(
            1L,
            "test",
            "username",
            "password",
            true,
            UserType.CUSTOMER,
            "firstName",
            "lastName",
            0,
            "",
            "",
            "");
    when(userRepository.save(user)).thenReturn(user);
    assertEquals(user, userService.create(user));
  }
}
