package meds.bookaroo.purchaseservice.feignClients;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
public class Listing {
  Long id;
  private Long bookIsbn;
  private Long sellerId;
  private double price;
  private Boolean isSwap;
  private Boolean isVisible;
  private Boolean isPreowned;
  private String imageUrl;
}
