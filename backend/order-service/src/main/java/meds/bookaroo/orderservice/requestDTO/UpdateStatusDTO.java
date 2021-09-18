package meds.bookaroo.orderservice.requestDTO;

import lombok.Data;

@Data
public class UpdateStatusDTO {
  long orderId;
  String status;
}
