package meds.bookaroo.bookservice.responseDTO;

import lombok.AllArgsConstructor;
import meds.bookaroo.bookservice.model.Book;

import java.util.List;

@AllArgsConstructor
public class GetBooksResponseDTO
{
   List<Book> book;



}
