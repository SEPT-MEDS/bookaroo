package meds.bookaroo.reviewservice.ResponseDTO;

public class CreateReviewResponseDTO extends StdResponseDTO {
  public CreateReviewResponseDTO(boolean isSuccess, String error) {
    super(isSuccess, error);
  }
}
