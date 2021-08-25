package meds.bookaroo.bookservice.controller;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.concurrent.ThreadLocalRandom;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    // Get book with a given ISBN
    @GetMapping("/{isbn}")
    public ResponseEntity<?> getBookWithIsbn(@PathVariable Long isbn) {
        Book book = bookService.getByIsbn(isbn);
        if(book != null) {
            book.setRating(ThreadLocalRandom.current().nextInt(0, 6));
            return ResponseEntity.ok(book);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    // Upload a book with required details
    @PostMapping("")
    public ResponseEntity<?> addBook(@RequestBody @Valid Book book) {
        bookService.create(book);
        return ResponseEntity.ok().build();
    }

    // Delete book with a given ISBN
    @DeleteMapping("/{isbn}")
    public ResponseEntity<?> deleteBookWithIsbn(@PathVariable Long isbn) {
        Book book = bookService.getByIsbn(isbn);
        if (book != null) {
            bookService.deleteByIsbn(isbn);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
