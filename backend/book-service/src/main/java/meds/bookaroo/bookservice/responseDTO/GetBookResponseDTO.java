package meds.bookaroo.bookservice.responseDTO;

import lombok.Getter;
import meds.bookaroo.bookservice.model.Book;

@Getter
public class GetBookResponseDTO extends StdResponseDTO {
  Book book;

  public GetBookResponseDTO(boolean isSuccess, Book book, String error) {
    super(isSuccess, error);
    this.book = book;
  }
}
