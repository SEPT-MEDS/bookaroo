package meds.bookaroo.listingservice.requestDTO;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class UpdateListingStatusDTO {
  long listingId;
  boolean isVisible;
}
