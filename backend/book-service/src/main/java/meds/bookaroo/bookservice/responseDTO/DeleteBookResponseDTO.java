package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;

// Delete book response structure
@AllArgsConstructor
public class DeleteBookResponseDTO extends StdResponseDTO {
  public DeleteBookResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
