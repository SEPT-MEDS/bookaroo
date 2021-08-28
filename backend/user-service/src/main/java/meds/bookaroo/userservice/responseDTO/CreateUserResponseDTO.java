package meds.bookaroo.userservice.responseDTO;

import lombok.Data;

@Data
public class CreateUserResponseDTO extends StdResponseDTO {
  public CreateUserResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
