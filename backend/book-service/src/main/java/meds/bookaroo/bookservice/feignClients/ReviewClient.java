package meds.bookaroo.bookservice.feignClients;

import meds.bookaroo.bookservice.requestDTO.GetReviewsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "REVIEW-SERVICE")
@Service
public interface ReviewClient {

  // Get all reviews for a book
  @GetMapping("/api/book/{isbn}/avgReview")
  int getAvgBookReviews(@PathVariable Long isbn);
}

