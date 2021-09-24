package meds.bookaroo.authservice.requestDTO;

import lombok.Data;

import javax.validation.constraints.NotBlank;

// Login request structure from front end
@Data
public class LoginRequest {
  @NotBlank(message = "Username cannot be blank")
  private String username;

  @NotBlank(message = "Password cannot be blank")
  private String password;
}
