package meds.bookaroo.purchaseservice.responseDTO;

import lombok.Data;
import lombok.Getter;
import meds.bookaroo.purchaseservice.model.Purchase;

@Getter
@Data
public class GetPurchaseResponseDTO extends StdResponseDTO {
  Purchase purchase;

  public GetPurchaseResponseDTO(boolean isSuccess, Purchase purchase, String error) {
    super(isSuccess, error);
    this.purchase = purchase;
  }
}
