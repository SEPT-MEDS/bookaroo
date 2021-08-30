package meds.bookaroo.listingservice.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

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

  @NotBlank(message = "Book isbn is required")
  private Long bookIsbn;

  @NotBlank(message = "Seller id is required")
  private Long sellerId;

  @NotBlank(message = "Price is required")
  private double price;

  @NotBlank(message = "isSwap is required")
  private Boolean isSwap;

  @NotBlank(message = "isVisible is required")
  private Boolean isVisible;

  @NotBlank(message = "Image URL is required")
  private String imageUrl;
}
