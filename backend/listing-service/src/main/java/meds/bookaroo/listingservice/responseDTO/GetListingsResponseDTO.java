package meds.bookaroo.listingservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.listingservice.model.Listing;

import java.util.List;

@AllArgsConstructor
@Data
public class GetListingsResponseDTO {
  List<Listing> listings;
}
