package meds.bookaroo.loginservice.controller;

import meds.bookaroo.loginservice.service.LoginService;
import meds.bookaroo.loginservice.requestDTO.LoginRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.http.ResponseEntity.ok;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDTO requestDTO, HttpServletRequest request) {
        String token = loginService.login(requestDTO, request);
        return ok().body(loginService.login(requestDTO, request));
    }

    @GetMapping("/test")
    public String test() {
        return "test done";
    }

}
