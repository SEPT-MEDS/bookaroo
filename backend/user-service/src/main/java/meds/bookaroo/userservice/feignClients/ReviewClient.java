package meds.bookaroo.userservice.feignClients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "REVIEW-SERVICE")
@Service
public interface ReviewClient {
  // Get average of reviews by userid
  @GetMapping("/api/user/{userid}/avgReview")
  Integer getAvgUserReviews(@PathVariable Long userid);
}

