package meds.bookaroo.authservice.controller;

import meds.bookaroo.authservice.feignClients.UserClient;
import meds.bookaroo.authservice.requestDTO.LoginRequest;
import meds.bookaroo.authservice.responseDTO.JWTLoginResponseDTO;
import meds.bookaroo.authservice.security.JwtTokenProvider;
import meds.bookaroo.authservice.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static meds.bookaroo.authservice.security.SecurityConstant.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private MapValidationErrorService mapValidationErrorService;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserClient userClient;

  // Login a user with a provided token
  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest, BindingResult result) {
    ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
    if (errorMap != null) {
      return errorMap;
    }

    // Authenticate using password and manager
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(),
            loginRequest.getPassword()
        )
    );

    // Get user id using user client
    Long userId = userClient.getUserByUsername(loginRequest.getUsername()).orElseThrow().getId();

    // Set authentication and return successful response
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JWTLoginResponseDTO(jwt, userId));
  }
}
