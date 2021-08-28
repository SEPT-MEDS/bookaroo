package meds.bookaroo.bookservice.controller;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.responseDTO.CreateBookResponseDTO;
import meds.bookaroo.bookservice.responseDTO.DeleteBookResponseDTO;
import meds.bookaroo.bookservice.responseDTO.GetBookResponseDTO;
import meds.bookaroo.bookservice.responseDTO.GetBooksResponseDTO;
import meds.bookaroo.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/book")
public class BookController {

  @Autowired
  private BookService bookService;

  // Get book with a given ISBN
  @GetMapping("/{isbn}")
  public ResponseEntity<?> getBookWithIsbn(@PathVariable Long isbn) {
    Book book = bookService.getByIsbn(isbn);

    // Ensure book was able to be retrieved
    if (book != null) {
      book.setRating(ThreadLocalRandom.current().nextInt(0, 6));
      return ResponseEntity.ok(new GetBookResponseDTO(true, book, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GetBookResponseDTO(false, null, "No book with isbn " + isbn + " exists"));
    }
  }

  // Upload a book with required details
  @PostMapping("")
  public ResponseEntity<?> addBook(@RequestBody @Valid Book book) {
    // Ensure book doesn't already exist with same ISBN
    if (bookService.getByIsbn(book.getIsbn()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new CreateBookResponseDTO(false, "Book with that ISBN already exists"));
    } else {
      bookService.create(book);
      return ResponseEntity.ok(new CreateBookResponseDTO(true, ""));
    }
  }

  // Delete book with a given ISBN
  @DeleteMapping("/{isbn}")
  public ResponseEntity<?> deleteBookWithIsbn(@PathVariable Long isbn) {
    Book book = bookService.getByIsbn(isbn);

    // Ensure book was able to be found in database
    if (book != null) {
      bookService.deleteByIsbn(isbn);
      return ResponseEntity.ok(new DeleteBookResponseDTO(true, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DeleteBookResponseDTO(false, "No book with ISBN " + isbn));
    }
  }

  @GetMapping("/containingIsbn/{isbn}")
  public ResponseEntity<?> getBookContainingIsbn(@PathVariable Long isbn) {
    List<Book> books = bookService.getByContainingIsbn(isbn);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  @GetMapping("/containingTitle/{title}")
  public ResponseEntity<?> getBookContainingTitle(@PathVariable String title) {
    List<Book> books = bookService.getByContainingTitle(title);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  @GetMapping("/containingAuthor/{author}")
  public ResponseEntity<?> getBookContainingAuthor(@PathVariable String author) {
    List<Book> books = bookService.getByContainingAuthor(author);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  @GetMapping("/containingCategory/{category}")
  public ResponseEntity<?> getBookContainingCategory(@PathVariable String category) {
    List<Book> books = bookService.getByContainingCategory(category);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }


}
