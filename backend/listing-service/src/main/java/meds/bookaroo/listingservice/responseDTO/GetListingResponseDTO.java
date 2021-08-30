package meds.bookaroo.listingservice.responseDTO;

import lombok.Getter;
import meds.bookaroo.listingservice.model.Listing;

@Getter
public class GetListingResponseDTO extends StdResponseDTO {
  Listing listing;

  public GetListingResponseDTO(boolean isSuccess, Listing listing, String error) {
    super(isSuccess, error);
    this.listing = listing;
  }
}
