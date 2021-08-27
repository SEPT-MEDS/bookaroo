package meds.bookaroo.authservice.responseDTO;

import lombok.Getter;
import meds.bookaroo.authservice.feignClients.CustomUserDetails;

@Getter
public class GetUserResponseDTO extends StdResponseDTO {
  CustomUserDetails user;

  public GetUserResponseDTO(boolean isSuccess, CustomUserDetails user, String error) {
    super(isSuccess, error);
    this.user = user;
  }
}
