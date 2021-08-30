package meds.bookaroo.listingservice.controller;

import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.responseDTO.CreateListingResponseDTO;
import meds.bookaroo.listingservice.responseDTO.GetListingResponseDTO;
import meds.bookaroo.listingservice.responseDTO.GetListingsResponseDTO;
import meds.bookaroo.listingservice.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/listing")
public class ListingController {

  @Autowired
  private ListingService listingService;

  // Upload a listing
  @PostMapping("")
  public ResponseEntity<?> addListing(@RequestBody @Valid Listing listing) {
    listingService.create(listing);
    return ResponseEntity.ok(new CreateListingResponseDTO(true, ""));
  }

  // Get listing by isbn
  @GetMapping("/{listingid}")
  public ResponseEntity<?> getListingById(@PathVariable Long listingid) {
    Listing listing = listingService.getByListingId(listingid);

    if (listing != null) {
      return ResponseEntity.ok(new GetListingResponseDTO(true, listing, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GetListingResponseDTO(false, null, "No listing with id " + listingid));
    }
  }

  // Get all listings by an author
  @GetMapping("/byAuthor/{sellerid}")
  public ResponseEntity<?> getListingBySellerId(@PathVariable Long sellerid) {
    List<Listing> listings = listingService.getBySellerId(sellerid);
    return ResponseEntity.ok(new GetListingsResponseDTO(listings));
  }

  // Get all listings by an isbn
  @GetMapping("/byBookIsbn/{isbn}")
  public ResponseEntity<?> getListingByBookIsbn(@PathVariable Long isbn) {
    List<Listing> listings = listingService.getBySellerId(isbn);
    return ResponseEntity.ok(new GetListingsResponseDTO(listings));
  }
}
