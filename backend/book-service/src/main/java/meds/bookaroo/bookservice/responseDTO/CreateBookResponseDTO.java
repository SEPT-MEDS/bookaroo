package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;

// Create book response structure
@AllArgsConstructor
public class CreateBookResponseDTO extends StdResponseDTO {
  public CreateBookResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
