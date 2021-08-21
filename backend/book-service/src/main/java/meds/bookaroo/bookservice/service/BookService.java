package meds.bookaroo.bookservice.service;

import meds.bookaroo.bookservice.exception.ISBNAlreadyExistsException;
import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository repository;

    public Book saveBook(Book book) {
        try {
            return repository.save(book);
        } catch (Exception e) {
            throw new ISBNAlreadyExistsException("Book with ISBN '" + book.getIsbn() + "' already exists");
        }
    }

    public Optional<Book> getBookWithIsbn(Long isbn) {
        return repository.findById(isbn);
    }

    public void deleteBookWithIsbn(long isbn) {
        repository.deleteById(isbn);
    }
}
