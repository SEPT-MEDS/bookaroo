package meds.bookaroo.listingservice;

import meds.bookaroo.listingservice.repository.ListingRepository;
import meds.bookaroo.listingservice.service.ListingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ListingServiceTest {

  ListingService listingService;

  @Mock
  ListingRepository listingRepository;

  @BeforeEach
  void initUseCase() {
    listingService = new ListingService(listingRepository);
  }
  

}
