package meds.bookaroo.bookservice.controller;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.service.BookService;
import meds.bookaroo.bookservice.service.MapValidationErrorService;
import meds.bookaroo.bookservice.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/book")
@RestControllerAdvice
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookValidator bookValidator;

    @PostMapping("/")
    public ResponseEntity<?> saveBook(@RequestBody Book book, BindingResult result) {
        bookValidator.validate(book,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }

        Book newBook = bookService.saveBook(book);

        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<?> getBookWithIsbn(@PathVariable Long isbn) {
        return ResponseEntity.ok(bookService.getBookWithIsbn(isbn));
    }

    @DeleteMapping("/{isbn}")
    public void deleteBook(@PathVariable Long isbn) {
        bookService.deleteBookWithIsbn(isbn);
    }
}
