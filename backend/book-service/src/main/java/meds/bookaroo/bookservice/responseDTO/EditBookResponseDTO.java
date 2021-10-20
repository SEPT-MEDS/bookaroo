package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class EditBookResponseDTO extends StdResponseDTO {
   public EditBookResponseDTO(boolean isSuccess, String error) {
      super(isSuccess, error);
   }
}
