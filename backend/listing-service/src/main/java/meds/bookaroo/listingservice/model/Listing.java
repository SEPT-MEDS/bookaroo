package meds.bookaroo.listingservice.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Listing {
  private @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @NotNull(message = "Book isbn is required")
  private Long bookIsbn;

  @NotNull(message = "Seller id is required")
  private Long sellerId;

  private double price;

  @NotNull(message = "isSwap is required")
  private Boolean isSwap;

  @NotNull(message = "isVisible is required")
  private Boolean isVisible;

  @NotBlank(message = "Image URL is required")
  private String imageUrl;
}
