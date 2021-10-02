package meds.bookaroo.purchaseservice.feignClients;

import meds.bookaroo.purchaseservice.requestDTO.UpdateListingStatusDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(name = "LISTING-SERVICE")
@Service
public interface ListingClient {

  // Update Listing with Listing Id
  @PostMapping("/api/listing/visible")
  void updateListing(@RequestBody UpdateListingStatusDTO request);

  @GetMapping("/api/listing/{listingid}")
  Optional<Listing> getListing(@PathVariable Long listingid);
}
