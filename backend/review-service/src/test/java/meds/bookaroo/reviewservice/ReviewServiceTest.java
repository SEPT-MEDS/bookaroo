package meds.bookaroo.reviewservice;

import meds.bookaroo.reviewservice.model.Review;
import meds.bookaroo.reviewservice.repository.ReviewRepository;
import meds.bookaroo.reviewservice.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {

  ReviewService reviewService;

  @Mock ReviewRepository reviewRepository;

  @BeforeEach
  void initUserCase() {
    reviewService = new ReviewService(reviewRepository);
  }

  @Test
  public void getValidReviewsByEntityId() {
    List<Review> reviews = new ArrayList<>();
    Review review = new Review(1L, 1L, 1L, 1, "Review content");
    reviews.add(review);
    when(reviewRepository.findAllByEntityId(1L)).thenReturn(reviews);
    assertEquals(reviews, reviewService.getByEntityID(1L));
  }

  @Test
  public void getInvalidReviewsByEntityId() {
    List<Review> reviews = new ArrayList<>();
    when(reviewRepository.findAllByEntityId(2L)).thenReturn(reviews);
    assertEquals(reviews, reviewService.getByEntityID(2L));
  }
}
