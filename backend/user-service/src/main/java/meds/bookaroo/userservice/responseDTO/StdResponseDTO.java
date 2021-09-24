package meds.bookaroo.userservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StdResponseDTO {
  boolean isSuccess;
  String error;
}
