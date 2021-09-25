package meds.bookaroo.userservice.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import meds.bookaroo.userservice.feignClients.Review;

import java.util.List;

@Getter
@AllArgsConstructor
public class GetReviewsDTO {
  List<Review> reviews;
  boolean isSuccess;
  String error;
}
