package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.bookservice.model.Book;

import java.util.List;

@AllArgsConstructor
@Data
public class GetBooksResponseDTO {
  List<Book> books;
}
