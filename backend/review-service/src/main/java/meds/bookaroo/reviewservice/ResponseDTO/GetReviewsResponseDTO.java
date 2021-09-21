package meds.bookaroo.reviewservice.ResponseDTO;

import meds.bookaroo.reviewservice.model.Review;

import java.util.List;

public class GetReviewsResponseDTO extends StdResponseDTO {
  List<Review> reviews;

  public GetReviewsResponseDTO(boolean isSuccess, List<Review> reviews, String error) {
    super(isSuccess, error);
    this.reviews = reviews;
  }
}
