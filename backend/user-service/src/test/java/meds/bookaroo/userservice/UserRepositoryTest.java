package meds.bookaroo.userservice;

import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.model.UserType;
import meds.bookaroo.userservice.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class UserRepositoryTest {

  private static Validator validator;

  @Autowired
  private UserRepository userRepository;


  @BeforeAll
  static void setUp() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  @AfterEach
  public void destroyAll() {
    userRepository.deleteAll();
  }

  @Test
  void saveValidUser() {
    User user = new User(1L, "test", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(0, violations.size());
  }


  @Test
  void saveUserInvalidEmail() {
    User user = new User(1L, "email", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void saveUserInvalidBlankEmail() {
    User user = new User(1L, "", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void saveUserInvalidBlankUsername() {
    User user = new User(1L, "test@me.com", "", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void saveUserInvalidBlankPassword() {
    User user = new User(1L, "test@me.com", "username", "", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void saveUserInvalidBlankFirstName() {
    User user = new User(1L, "test@me.com", "username", "password", true, UserType.CUSTOMER, "", "lastName", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void saveUserInvalidBlankLastName() {
    User user = new User(1L, "test@me.com", "username", "password", true, UserType.CUSTOMER, "firstName", "", "", "", "");
    Set<ConstraintViolation<User>> violations = validator.validate(user);
    assertEquals(1, violations.size());
  }

  @Test
  void deleteUser() {
    User user = new User(1L, "test@me.com", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "0438156612", "", "");
    userRepository.save(user);
    userRepository.deleteById(1L);
    assertEquals(0, userRepository.findAll().size());
  }
}
