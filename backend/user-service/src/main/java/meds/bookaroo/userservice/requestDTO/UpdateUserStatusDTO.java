package meds.bookaroo.userservice.requestDTO;

// Modify user status request layout

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Data
@Getter
public class UpdateUserStatusDTO {
  @NotBlank(message = "Username cannot be blank")
  private Long userId;

  @NotBlank(message = "isEnabled cannot be blank")
  private Boolean isEnabled;
}
