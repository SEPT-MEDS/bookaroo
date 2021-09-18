package meds.bookaroo.orderservice.responseDTO;

import lombok.Getter;
import meds.bookaroo.orderservice.feignClients.Listing;

@Getter
public class GetListingResponseDTO extends StdResponseDTO {
  Listing listing;

  public GetListingResponseDTO(boolean isSuccess, Listing listing, String error) {
    super(isSuccess, error);
    this.listing = listing;
  }
}
