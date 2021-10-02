package meds.bookaroo.listingservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meds.bookaroo.listingservice.model.Listing;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetListingsResponseDTO {
  List<Listing> listings;
}
