package meds.bookaroo.userservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.requestDTO.UserRequestDTO;
import meds.bookaroo.userservice.service.MapValidationErrorService;
import meds.bookaroo.userservice.service.UserService;
import meds.bookaroo.userservice.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.ResponseEntity.ok;

import static meds.bookaroo.userservice.constants.KeyConstants.*;

@RestController
@RequestMapping("/user")
@Api("User controller")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("/")
    @ApiOperation(value = "Save new user")
    @ResponseBody
    public ResponseEntity<?> saveUser(@RequestBody User user, BindingResult result) {
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @ApiOperation("Get user with id")
    public ResponseEntity<?> getUserWithId(@PathVariable Long id) {
        return ResponseEntity.ok("TEST");
        //return ResponseEntity.ok(userService.getUserWithId(id));
    }

    @GetMapping("/")
    @ApiOperation("Get user with username")
    public ResponseEntity<?> getUserWithUsername(@RequestBody UserRequestDTO requestDTO) {
        return ok().body(userService.getUserWithUsername(requestDTO.getUsername()));
    }

    @DeleteMapping("/{userid}")
    public void deleteUserProfile(@PathVariable Long userid) {
        userService.deleteUserWithId(userid);
    }
}
