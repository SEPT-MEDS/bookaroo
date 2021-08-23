package meds.bookaroo.bookservice.controller;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/{isbn}")
    public ResponseEntity<?> getBookWithIsbn(@PathVariable Long isbn) {
        Book book = bookService.getByIsbn(isbn);
        if(book != null) {
            return ResponseEntity.ok(book);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        bookService.create(book);
        return ResponseEntity.ok().build();
    }

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
