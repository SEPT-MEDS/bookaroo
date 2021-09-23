package meds.bookaroo.listingservice;

import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.repository.ListingRepository;
import meds.bookaroo.listingservice.service.ListingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ListingServiceTest {

  ListingService listingService;

  @Mock ListingRepository listingRepository;

  @BeforeEach
  void initUseCase() {
    listingService = new ListingService(listingRepository);
  }

  @Test
  public void getValidListingByListingId() {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, false, "url");
    when(listingRepository.findById(1L)).thenReturn(java.util.Optional.of(listing));
    assertEquals(listing, listingService.getByListingId(1L));
  }

  @Test
  public void getInvalidListingByListingId() {
    when(listingRepository.findById(1L)).thenReturn(null);
    assertNull(listingRepository.findById(1L));
  }

  @Test
  public void getValidListingByBookIsbn() {
    List<Listing> listings = new ArrayList<>();
    listings.add(new Listing(1L, 1000000000L, 1L, 50, false, true, false, "url"));
    when(listingRepository.findByBookIsbn(1000000000L)).thenReturn(listings);
    assertEquals(listings, listingService.getByBookIsbn(1000000000L));
  }

  @Test
  public void getInvalidListingByBookIsbn() {
    when(listingRepository.findByBookIsbn(1000000000L)).thenReturn(new ArrayList<>());
    assertEquals(listingRepository.findByBookIsbn(1000000000L).size(), 0);
  }

  @Test
  public void getValidListingBySellerId() {
    List<Listing> listings = new ArrayList<>();
    listings.add(new Listing(1L, 1000000000L, 1L, 50, false, true, false, "url"));
    when(listingRepository.findBySellerId(1L)).thenReturn(listings);
    assertEquals(listings, listingService.getBySellerId(1L));
  }

  @Test
  public void getInvalidListingBySellerId() {
    when(listingRepository.findBySellerId(1L)).thenReturn(new ArrayList<>());
    assertEquals(listingRepository.findBySellerId(1L).size(), 0);
  }
}
