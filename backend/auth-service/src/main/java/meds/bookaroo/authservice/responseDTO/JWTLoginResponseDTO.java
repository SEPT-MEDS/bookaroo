package meds.bookaroo.authservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class JWTLoginResponseDTO extends StdResponseDTO {
  ResponseData data;

  public JWTLoginResponseDTO(String token, Long userId) {
    super(true, "");
    this.data = new JWTLoginResponseDTO.ResponseData(token, userId);
  }

  @AllArgsConstructor
  @Data
  public static class ResponseData {
    public String token;
    public Long userId;
  }
}
