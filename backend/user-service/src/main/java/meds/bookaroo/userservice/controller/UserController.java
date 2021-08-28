package meds.bookaroo.userservice.controller;

import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.responseDTO.CreateUserResponseDTO;
import meds.bookaroo.userservice.responseDTO.DeleteUserResponseDTO;
import meds.bookaroo.userservice.responseDTO.GetUserResponseDTO;
import meds.bookaroo.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserService userService;

  // Get users with a given user ID
  @GetMapping("/{id}")
  public ResponseEntity<?> getUserWithId(@PathVariable Long id) {
    User user = userService.getById(id);

    // Ensure user was able to be retrieved and respond appropriately
    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GetUserResponseDTO(false, null, "No user with id " + id + " exists"));
    } else {
      return ResponseEntity.ok(new GetUserResponseDTO(true, user, ""));
    }
  }

  // Get a user by a given username
  @GetMapping("/byUsername/{username}")
  public ResponseEntity<?> getUserWithUsername(@PathVariable String username) {
    User user = userService.getByUsername(username);

    // Ensure user was able to be retrieved and respond appropriately
    if (user == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(user);
    }
  }

  // Delete users with a given user ID
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUserWithId(@PathVariable Long id) {
    User user = userService.getById(id);

    // Ensure user exists
    if (user != null) {
      userService.deleteById(id);
      return ResponseEntity.ok(new DeleteUserResponseDTO(true, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DeleteUserResponseDTO(false, "No user with id " + id + " exists"));
    }
  }

  @PostMapping("/signup")
  public ResponseEntity<?> signupUser(@RequestBody User user) {
    // Ensure user doesnt already exist
    if (userService.getByUsername(user.getUsername()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new CreateUserResponseDTO(false, "User with that username already exists"));
    } else if (userService.getByEmail(user.getEmail()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new CreateUserResponseDTO(false, "User with that email already exists"));
    }

    // Create user
    userService.create(user);
    return ResponseEntity.ok().body(new CreateUserResponseDTO(true, ""));
  }
}
