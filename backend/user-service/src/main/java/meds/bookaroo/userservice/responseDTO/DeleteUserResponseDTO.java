package meds.bookaroo.userservice.responseDTO;

public class DeleteUserResponseDTO extends StdResponseDTO {
  public DeleteUserResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
