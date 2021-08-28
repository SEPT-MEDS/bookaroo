package meds.bookaroo.bookservice.responseDTO;

public class DeleteBookResponseDTO extends StdResponseDTO {
  public DeleteBookResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
