package meds.bookaroo.userservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StdResponseDTO {
  boolean isSuccess;
  String error;
}