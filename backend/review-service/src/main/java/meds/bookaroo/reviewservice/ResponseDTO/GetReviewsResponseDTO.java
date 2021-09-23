package meds.bookaroo.reviewservice.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.reviewservice.model.Review;

import java.util.List;

@AllArgsConstructor
@Data
public class GetReviewsResponseDTO {
  List<Review> reviews;
}
