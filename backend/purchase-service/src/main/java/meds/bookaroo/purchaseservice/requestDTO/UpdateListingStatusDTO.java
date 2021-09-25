package meds.bookaroo.purchaseservice.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateListingStatusDTO {
  long listingId;
  boolean isVisible;
}

