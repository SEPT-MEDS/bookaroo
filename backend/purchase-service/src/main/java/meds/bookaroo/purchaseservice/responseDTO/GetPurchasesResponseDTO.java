package meds.bookaroo.purchaseservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.purchaseservice.model.Purchase;

import java.util.List;

@AllArgsConstructor
@Data
public class GetPurchasesResponseDTO {
  List<Purchase> purchases;
}
