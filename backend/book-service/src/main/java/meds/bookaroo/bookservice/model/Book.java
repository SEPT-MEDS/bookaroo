package meds.bookaroo.bookservice.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Book {
    private @Id
    Long isbn;
    @NotBlank
    private String title;
    @NotBlank
    private String author;
    private String blurb;
    private int numPages;
}
