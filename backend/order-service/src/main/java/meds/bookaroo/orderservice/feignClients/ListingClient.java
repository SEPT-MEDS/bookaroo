package meds.bookaroo.orderservice.feignClients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "LISTING-SERVICE")
public interface ListingClient {

  // Update Listing with Listing Id
  @PatchMapping("/api/listing")
  void updateListing(@RequestBody Listing listing);

  @GetMapping("/api/listing/{listingid}")
  Listing getListing(@PathVariable Long listingid);
}
