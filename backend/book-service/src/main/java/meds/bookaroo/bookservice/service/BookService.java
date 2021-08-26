package meds.bookaroo.bookservice.service;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book getByIsbn(Long isbn) {
        return bookRepository.findByIsbn(isbn);
    }

    public void create(Book book) {
        bookRepository.save(book);
    }

    public void deleteByIsbn(Long isbn) {
        bookRepository.deleteByIsbn(isbn);
    }
}