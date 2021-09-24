package meds.bookaroo.bookservice.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import meds.bookaroo.bookservice.feignClients.Review;

import java.util.List;

@Getter
@AllArgsConstructor
public class GetReviewsDTO {
  List<Review> reviews;
  boolean isSuccess;
  String error;
}
