package meds.bookaroo.orderservice.responseDTO;

import lombok.Data;
import lombok.Getter;
import meds.bookaroo.orderservice.model.Order;

@Getter
@Data
public class GetOrderResponseDTO extends StdResponseDTO {
  Order order;

  public GetOrderResponseDTO(boolean isSuccess, Order order, String error) {
    super(isSuccess, error);
    this.order = order;
  }
}
