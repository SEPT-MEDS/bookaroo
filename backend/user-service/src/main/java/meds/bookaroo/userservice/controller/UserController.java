package meds.bookaroo.userservice.controller;

import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Get users with a given user ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserWithId(@PathVariable Long id) {
        User user = userService.getById(id);
        if(user != null) {
            return ResponseEntity.ok(user);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete users with a given user ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserWithId(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            userService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Signup a user with required details
    // TODO Authentication of user details
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody @Valid User user) {
        userService.create(user);
        return ResponseEntity.ok().build();
    }

    // Get a user by a given username
    @GetMapping("/byUsername/{username}")
    public ResponseEntity<?> getUserWithUsername(@PathVariable String username) {
        User user = userService.getByUsername(username);
        if (user != null)
            return ResponseEntity.ok(user);
        else
            return ResponseEntity.notFound().build();
    }
}
