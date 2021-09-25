package meds.bookaroo.bookservice.service;

import meds.bookaroo.bookservice.feignClients.ReviewClient;
import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
  @Autowired private BookRepository bookRepository;

  @Autowired ReviewClient bookReviewClient;

  public BookService(BookRepository bookRepository, ReviewClient reviewClient) {
    this.bookRepository = bookRepository;
    this.bookReviewClient = reviewClient;
  }

  public Book getByIsbn(Long isbn) {
    return averageReview(bookRepository.findByIsbn(isbn));
  }

  public List<Book> getByContainingTitle(String title) {
    return averageAllReviews(bookRepository.findByTitleContaining(title));
  }

  public List<Book> getByContainingAuthor(String author) {
    return averageAllReviews(bookRepository.findByAuthorContaining(author));
  }

  public List<Book> getByContainingIsbn(Long isbn) {
    return averageAllReviews(bookRepository.findByIsbnContaining(isbn));
  }

  public List<Book> getByCategory(String category) {
    return averageAllReviews(bookRepository.findByCategory(category));
  }

  public List<Book> getAll() {
    return averageAllReviews(bookRepository.findAll());
  }

  public Book create(Book book) {
    return bookRepository.save(book);
  }

  public void deleteByIsbn(Long isbn) {
    bookRepository.deleteByIsbn(isbn);
  }

  private List<Book> averageAllReviews(List<Book> books) {
    if (books != null) {
      for (Book book : books) {
        averageReview(book);
      }
    }
    return books;
  }

  private Book averageReview(Book book) {
    if (book != null) {
      book.setRating(bookReviewClient.getAvgBookReviews(book.getIsbn()));
    }
    return book;
  }
}
