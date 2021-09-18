package meds.bookaroo.orderservice.responseDTO;

public class CreateOrderResponseDTO extends StdResponseDTO {
  public CreateOrderResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
