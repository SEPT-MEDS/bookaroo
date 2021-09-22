package meds.bookaroo.purchaseservice.requestDTO;

import lombok.Data;

@Data
public class UpdateStatusDTO {
  long purchaseId;
  String status;
}
