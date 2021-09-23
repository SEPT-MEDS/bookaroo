package meds.bookaroo.purchaseservice.feignClients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@FeignClient(name = "LISTING-SERVICE")
@Service
public interface ListingClient {

  // Update Listing with Listing Id
  @PatchMapping("/api/listing")
  void updateListing(@RequestBody Listing listing);

  @GetMapping("/api/listing/{listingid}")
  Optional<Listing> getListing(@PathVariable Long listingid);
}
