package meds.bookaroo.listingservice;

import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.repository.ListingRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class ListingRepositoryTest {

  private static Validator validator;

  @Autowired private ListingRepository listingRepository;

  @BeforeAll
  static void setUp() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  @AfterEach
  public void destroyAll() {
    listingRepository.deleteAll();
  }

  @Test
  void saveValidListing() {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, false, "url");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(0, violations.size());
  }

  @Test
  void saveListingBlankId() {
    Listing listing = new Listing(null, 1000000000L, 1L, 50, false, true, false, "url");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(0, violations.size());
  }

  @Test
  void saveListingInvalidISBN() {
    Listing listing = new Listing(1L, 1L, 1L, 50, false, true, false, "url");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(1, violations.size());
  }

  @Test
  void saveListingBlankISBN() {
    Listing listing = new Listing(1L, null, 1L, 50, false, true, false, "url");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(1, violations.size());
  }

  @Test
  void saveListingBlankSellerId() {
    Listing listing = new Listing(1L, 1000000000L, null, 50, false, true, false, "url");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(1, violations.size());
  }

  @Test
  void saveListingBlankImageUrl() {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, false, "");
    Set<ConstraintViolation<Listing>> violations = validator.validate(listing);
    assertEquals(1, violations.size());
  }
}
