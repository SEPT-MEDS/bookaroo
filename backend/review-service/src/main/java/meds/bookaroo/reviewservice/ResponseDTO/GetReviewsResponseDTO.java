package meds.bookaroo.reviewservice.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meds.bookaroo.reviewservice.model.Review;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetReviewsResponseDTO {
  List<Review> reviews;
}
