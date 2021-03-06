package meds.bookaroo.listingservice.controller;

import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.requestDTO.UpdateListingStatusDTO;
import meds.bookaroo.listingservice.responseDTO.CreateListingResponseDTO;
import meds.bookaroo.listingservice.responseDTO.DeleteListingResponseDTO;
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
public class ListingController {

  @Autowired private ListingService listingService;

  // Upload a listing
  @PostMapping("/api/listing")
  public ResponseEntity<?> addListing(@RequestBody @Valid Listing listing) {
    listingService.create(listing);
    return ResponseEntity.ok(new CreateListingResponseDTO(true, ""));
  }

  // Get listing by listing id
  @GetMapping("/api/listing/{listingid}")
  public ResponseEntity<?> getListingById(@PathVariable Long listingid) {
    Listing listing = listingService.getByListingId(listingid);
    if (listing != null) {
      return ResponseEntity.ok(new GetListingResponseDTO(true, "", listing));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new GetListingResponseDTO(false, "No listing with id " + listingid, null));
    }
  }

  // Get all listings by an seller id
  @GetMapping("/api/user/{sellerid}/listings")
  public ResponseEntity<?> getListingBySellerId(@PathVariable Long sellerid) {
    List<Listing> listings = listingService.getBySellerId(sellerid);
    return ResponseEntity.ok(new GetListingsResponseDTO(listings));
  }

  // Get all listings by an isbn
  @GetMapping("/api/book/{isbn}/listings")
  public ResponseEntity<?> getListingByBookIsbn(@PathVariable Long isbn) {
    List<Listing> listings = listingService.getByBookIsbn(isbn);
    return ResponseEntity.ok(new GetListingsResponseDTO(listings));
  }

  // Delete listing by an isbn
  @DeleteMapping("/api/listing/{listingid}")
  public ResponseEntity<?> deleteListingById(@PathVariable Long listingid) {
    Listing listing = listingService.getByListingId(listingid);
    if (listing != null) {
      listingService.delete(listingid);
      return ResponseEntity.ok(new DeleteListingResponseDTO(true, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new DeleteListingResponseDTO(false, "No listing with id " + listingid));
    }
  }

  // Replace a listing with a new listing
  @PostMapping("/api/listing/visible")
  public ResponseEntity<?> updateListingStatus(@RequestBody UpdateListingStatusDTO request) {
    Listing listing = listingService.getByListingId(request.getListingId());
    if (listing != null) {
      listing.setIsVisible(request.isVisible());
      listingService.create(listing);
      return ResponseEntity.ok(true);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
