package meds.bookaroo.reviewservice;

import meds.bookaroo.reviewservice.model.Review;
import meds.bookaroo.reviewservice.repository.ReviewRepository;
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
public class ReviewRepositoryTest {

  private static Validator validator;

  @Autowired private ReviewRepository reviewRepository;

  @BeforeAll
  static void setUp() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  @AfterEach
  public void destroyAll() {
    reviewRepository.deleteAll();
  }

  @Test
  void saveValidReview() {
    Review review = new Review(1L, 1L, 1L, 5, "content");
    Set<ConstraintViolation<Review>> violations = validator.validate(review);
    assertEquals(0, violations.size());
  }

  @Test
  void saveReviewBlankId() {
    Review review = new Review(null, 1L, 1L, 5, "content");
    Set<ConstraintViolation<Review>> violations = validator.validate(review);
    assertEquals(0, violations.size());
  }

  @Test
  void saveReviewBlankEntityId() {
    Review review = new Review(1L, null, 1L, 5, "content");
    Set<ConstraintViolation<Review>> violations = validator.validate(review);
    assertEquals(1, violations.size());
  }

  @Test
  void saveReviewBlankReviewerId() {
    Review review = new Review(1L, 1L, null, 5, "content");
    Set<ConstraintViolation<Review>> violations = validator.validate(review);
    assertEquals(1, violations.size());
  }

  @Test
  void saveReviewBlankContent() {
    Review review = new Review(1L, 1L, 1L, 5, "");
    Set<ConstraintViolation<Review>> violations = validator.validate(review);
    assertEquals(1, violations.size());
  }
}
