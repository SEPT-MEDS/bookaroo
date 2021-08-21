package meds.bookaroo.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserWithId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserWithId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> getUserWithId(@PathVariable Long id) {
        ResponseEntity.ok(userService.deleteUserWithId(id));
    }
}
