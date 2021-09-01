package meds.bookaroo.listingservice.service;

import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListingService {
  @Autowired
  private ListingRepository listingRepository;

  public void create(Listing listing) {
    listingRepository.save(listing);
  }

  public Listing getByListingId(Long listingId) {
    return listingRepository.findById(listingId).orElse(null);
  }

  public List<Listing> getBySellerId(Long sellerId) {
    return listingRepository.findBySellerId(sellerId);
  }

  public List<Listing> getByBookIsbn(Long isbn) {
    return listingRepository.findByBookIsbn(isbn);
  }
}
