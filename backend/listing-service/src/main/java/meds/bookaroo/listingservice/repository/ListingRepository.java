package meds.bookaroo.listingservice.repository;

import meds.bookaroo.listingservice.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
  List<Listing> findBySellerId(Long sellerId);

  List<Listing> findByBookIsbn(Long bookId);
}
