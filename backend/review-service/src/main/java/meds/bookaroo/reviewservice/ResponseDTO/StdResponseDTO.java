package meds.bookaroo.reviewservice.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StdResponseDTO {
  boolean isSuccess;
  String error;
}
