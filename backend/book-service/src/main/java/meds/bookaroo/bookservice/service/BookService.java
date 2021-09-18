package meds.bookaroo.bookservice.service;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
  @Autowired
  private BookRepository bookRepository;

  public BookService(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  public Book getByIsbn(Long isbn) {
    return bookRepository.findByIsbn(isbn);
  }

  public List<Book> getByContainingTitle(String title) {
    return bookRepository.findByTitleContaining(title);
  }

  public List<Book> getByContainingAuthor(String author) {
    return bookRepository.findByAuthorContaining(author);
  }

  public List<Book> getByContainingIsbn(Long isbn) {
    return bookRepository.findByIsbnContaining(isbn);
  }

  public List<Book> getByCategory(String category) {
    return bookRepository.findByCategory(category);
  }

  public List<Book> getAll() {
    return bookRepository.findAll();
  }

  public Book create(Book book) {
    return bookRepository.save(book);
  }

  public void deleteByIsbn(Long isbn) {
    bookRepository.deleteByIsbn(isbn);
  }
}