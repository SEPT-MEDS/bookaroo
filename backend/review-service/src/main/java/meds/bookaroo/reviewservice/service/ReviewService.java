package meds.bookaroo.reviewservice.service;

import meds.bookaroo.reviewservice.model.Review;
import meds.bookaroo.reviewservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
  @Autowired private ReviewRepository reviewRepository;

  public ReviewService(ReviewRepository reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public List<Review> getByEntityID(Long entityId) {
    return reviewRepository.findAllByEntityId(entityId);
  }

  public Review create(Review review) {
    return reviewRepository.save(review);
  }

  public Integer getAvgByEntityId(Long entityId) {
    Integer avgRating = reviewRepository.findAvgByEntityId(entityId);
    if (avgRating == null) {
      avgRating = 0;
    }
    return avgRating;
  }
}
