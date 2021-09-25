package meds.bookaroo.userservice.feignClients;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
public class Review {
  private Long entityId;
  private Long reviewerId;
  private Integer rating;
  private String content;
}