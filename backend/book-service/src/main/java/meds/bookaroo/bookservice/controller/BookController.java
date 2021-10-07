package meds.bookaroo.bookservice.controller;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.responseDTO.*;
import meds.bookaroo.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BookController {

  @Autowired private BookService bookService;

  // Upload a book with required details
  @PostMapping("/api/book")
  public ResponseEntity<?> addBook(@RequestBody @Valid Book book) {
    // Ensure book doesn't already exist with same ISBN
    if (bookService.getByIsbn(book.getIsbn()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(new CreateBookResponseDTO(false, "Review with that ISBN already exists"));
    } else {
      bookService.create(book);
      return ResponseEntity.ok(new CreateBookResponseDTO(true, ""));
    }
  }

  // Get all books
  @GetMapping("/api/book")
  public ResponseEntity<?> getBooks() {
    List<Book> books = bookService.getAll();
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  // Get book with a given ISBN
  @GetMapping("/api/book/{isbn}")
  public ResponseEntity<?> getBookWithIsbn(@PathVariable Long isbn) {
    Book book = bookService.getByIsbn(isbn);
    // Ensure book was able to be retrieved
    if (book != null) {
      return ResponseEntity.ok(new GetBookResponseDTO(true, "", book));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new GetBookResponseDTO(false, "No book with isbn " + isbn + " exists", null));
    }
  }

  // Delete book with a given ISBN
  @DeleteMapping("/api/book/{isbn}")
  public ResponseEntity<?> deleteBookWithIsbn(@PathVariable Long isbn) {
    Book book = bookService.getByIsbn(isbn);
    // Ensure book was able to be found in database
    if (book != null) {
      bookService.deleteByIsbn(isbn);
      return ResponseEntity.ok(new DeleteBookResponseDTO(true, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new DeleteBookResponseDTO(false, "No book with ISBN " + isbn));
    }
  }

  // Get books with partial title
  @GetMapping("/api/book/containingTitle/{title}")
  public ResponseEntity<?> getBookContainingTitle(@PathVariable String title) {
    List<Book> books = bookService.getByContainingTitle(title);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  // Get books with partial author
  @GetMapping("/api/book/containingAuthor/{author}")
  public ResponseEntity<?> getBookContainingAuthor(@PathVariable String author) {
    List<Book> books = bookService.getByContainingAuthor(author);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  // Get books with partial ISBN
  @GetMapping("/api/book/containingIsbn/{isbn}")
  public ResponseEntity<?> getBookContainingIsbn(@PathVariable Long isbn) {
    List<Book> books = bookService.getByContainingIsbn(isbn);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  // Get books with category
  @GetMapping("/api/book/byCategory/{category}")
  public ResponseEntity<?> getBookByCategory(@PathVariable String category) {
    List<Book> books = bookService.getByCategory(category);
    return ResponseEntity.ok(new GetBooksResponseDTO(books));
  }

  // Update/edit a book
  @PatchMapping("/api/book/{isbn}")
  public ResponseEntity<?> updateBook(@RequestBody @Valid Book updatedBook) {
    if (updatedBook != null) {
      bookService.save(updatedBook);
      return ResponseEntity.ok(true);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(new EditBookResponseDTO(false, "Cannot update book with value null"));
    }
  }
}
