package meds.bookaroo.reviewservice.controller;

import feign.Response;
import meds.bookaroo.reviewservice.ResponseDTO.CreateReviewResponseDTO;
import meds.bookaroo.reviewservice.ResponseDTO.GetReviewsResponseDTO;
import meds.bookaroo.reviewservice.model.Review;
import meds.bookaroo.reviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ReviewController {

  @Autowired private ReviewService reviewService;

  // Create a new review
  @PostMapping("/api/review")
  public ResponseEntity<?> addReview(@RequestBody @Valid Review review) {
    reviewService.create(review);
    return ResponseEntity.ok(new CreateReviewResponseDTO(true, ""));
  }

  // Get all reviews for a book
  @GetMapping("/api/book/{isbn}/reviews")
  public ResponseEntity<?> getReviewByIsbn(@PathVariable Long isbn) {
    List<Review> bookReviews = reviewService.getByEntityID(isbn);
    return ResponseEntity.ok(new GetReviewsResponseDTO(bookReviews));
  }

  // Get all reviews for a user
  @GetMapping("/api/user/{userid}/reviews")
  public ResponseEntity<?> getReviewByUserId(@PathVariable Long userid) {
    List<Review> userReviews = reviewService.getByEntityID(userid);
    return ResponseEntity.ok(new GetReviewsResponseDTO(userReviews));
  }

  @GetMapping("/api/user/{userid}/avgReview")
  public ResponseEntity<?> getAvgUserReview(@PathVariable Long userid) {
    int avgReview = reviewService.getAvgByEntityId(userid);
    return ResponseEntity.ok(avgReview);
  }

  @GetMapping("/api/book/{isbn}/avgReview")
  public ResponseEntity<?> getAvgBookReview(@PathVariable Long isbn) {
    int avgReview = reviewService.getAvgByEntityId(isbn);
    return ResponseEntity.ok(avgReview);
  }
}
