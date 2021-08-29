package meds.bookaroo.bookservice.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Book {

  @NotNull(message = "ISBN is required")
  @Min(value = 1000000000, message = "ISBN must be 10 or more digits")
  @Column(unique = true)
  private @Id
  Long isbn;

  @NotBlank(message = "Title is required")
  private String title;

  @NotBlank(message = "Author is required")
  private String author;

  private String blurb;
  private int numPages;
  private String url;
  private int rating;
  private String category;
}
