package meds.bookaroo.bookservice.responseDTO;

public class CreateBookResponseDTO extends StdResponseDTO {
  public CreateBookResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
