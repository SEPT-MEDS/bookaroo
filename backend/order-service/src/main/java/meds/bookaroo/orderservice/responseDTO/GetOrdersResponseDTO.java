package meds.bookaroo.orderservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.orderservice.model.Order;

import java.util.List;

@AllArgsConstructor
@Data
public class GetOrdersResponseDTO {
  List<Order> orders;
}
