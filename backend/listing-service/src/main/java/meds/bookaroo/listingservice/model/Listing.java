package meds.bookaroo.listingservice.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
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

  @NotNull(message = "ISBN is required")
  @Min(value = 1000000000, message = "ISBN must be 10 or more digits")
  @Column(unique = true)
  @NotNull(message = "Book isbn is required")
  private Long bookIsbn;

  @NotNull(message = "Seller id is required")
  private Long sellerId;

  private double price;

  @NotNull(message = "isSwap is required")
  private Boolean isSwap;

  @NotNull(message = "isVisible is required")
  private Boolean isVisible;

  @NotNull(message = "isPreowned is required")
  private Boolean isPreowned;

  @NotBlank(message = "Image URL is required")
  private String imageUrl;
}
