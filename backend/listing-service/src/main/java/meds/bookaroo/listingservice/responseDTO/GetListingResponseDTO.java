package meds.bookaroo.listingservice.responseDTO;

import lombok.Getter;
import meds.bookaroo.listingservice.model.Listing;

@Getter
public class GetListingResponseDTO extends StdResponseDTO {
  Listing listing;

  public GetListingResponseDTO(boolean isSuccess, String error, Listing listing) {
    super(isSuccess, error);
    this.listing = listing;
  }
}
