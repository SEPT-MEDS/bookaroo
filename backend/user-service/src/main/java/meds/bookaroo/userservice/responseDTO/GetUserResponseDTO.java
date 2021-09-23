package meds.bookaroo.userservice.responseDTO;

import meds.bookaroo.userservice.model.User;

public class GetUserResponseDTO extends StdResponseDTO {
  User user;

  public GetUserResponseDTO(boolean isSuccess, User user, String error) {
    super(isSuccess, error);
    this.user = user;
  }
}
