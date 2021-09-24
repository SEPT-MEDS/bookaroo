package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import meds.bookaroo.bookservice.model.Book;

@Getter
@AllArgsConstructor
// Get book response structure
public class GetBookResponseDTO extends StdResponseDTO {
  Book book;

  public GetBookResponseDTO(boolean isSuccess, String error, Book book) {
    super(isSuccess, error);
    this.book = book;
  }
}
