package meds.bookaroo.reviewservice.ResponseDTO;

public class StdResponseDTO {
  boolean isSuccess;
  String error;

  public StdResponseDTO(boolean isSuccess, String error) {
    this.isSuccess = isSuccess;
    this.error = error;
  }
}
