package meds.bookaroo.reviewservice.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Review {
  @Column(unique = true)
  private @Id
  Long id;

  @NotNull(message = "Entity id is required")
  private Long entityId;

  @NotNull(message = "Reviewer id is required")
  private Long reviewerId;

  @NotNull(message = "Rating is required")
  @Min(value = 1, message = "Rating must be between 1 and 5")
  @Max(value = 5, message = "Rating must be between 1 and 5")
  private int rating;

  @NotBlank(message = "Content is required")
  private String content;
}
