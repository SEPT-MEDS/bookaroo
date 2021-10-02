package meds.bookaroo.bookservice.feignClients;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
public class Review {
  private Long entityId;
  private Long reviewerId;
  private int rating;
  private String content;
}