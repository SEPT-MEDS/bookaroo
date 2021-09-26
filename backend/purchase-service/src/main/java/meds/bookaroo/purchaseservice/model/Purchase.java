package meds.bookaroo.purchaseservice.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Purchase {
  private @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @NotNull(message = "Listing id is required")
  private Long listingId;

  @NotNull(message = "Buyer id is required")
  private Long buyerId;

  @NotNull(message = "Seller id is required")
  private Long sellerId;

  @NotNull(message = "Paypal data is required")
  private String paypalData;

  @NotNull(message = "Purchase creation time is required")
  private Long purchaseCreationTime;

  @NotNull(message = "Cancelled status is required") 
  private Boolean isCancelled = false;
}
