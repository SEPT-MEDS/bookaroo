package meds.bookaroo.userservice.responseDTO;

public class CreateUserResponseDTO extends StdResponseDTO {
  public CreateUserResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
