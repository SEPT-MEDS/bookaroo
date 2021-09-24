package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StdResponseDTO {
  boolean isSuccess;
  String error;
}
