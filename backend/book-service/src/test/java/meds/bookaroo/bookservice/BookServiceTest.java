package meds.bookaroo.bookservice;

import meds.bookaroo.bookservice.feignClients.ReviewClient;
import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import meds.bookaroo.bookservice.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

  BookService bookService;

  @Mock
  ReviewClient bookReviewClient;

  @Mock BookRepository bookRepository;

  @BeforeEach
  void initUseCase() {
    bookService = new BookService(bookRepository, bookReviewClient);
  }

  @Test
  public void getValidBookByIsbn() {
    Book book =
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy");
    when(bookRepository.findByIsbn(12345678900L)).thenReturn(book);
    when(bookReviewClient.getAvgBookReviews(12345678900L)).thenReturn(5);
    assertEquals(book, bookService.getByIsbn(12345678900L));
  }

  @Test
  public void getInvalidBookByIsbn() {
    when(bookRepository.findByIsbn(1L)).thenReturn(null);
    assertNull(bookService.getByIsbn(1L));
  }

  @Test
  public void getValidBookByPartialTitle() {
    List<Book> books = new ArrayList<>();
    books.add(
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy"));
    when(bookRepository.findByTitleContaining("Review")).thenReturn(books);
    when(bookReviewClient.getAvgBookReviews(12345678900L)).thenReturn(5);
    assertEquals(books, bookService.getByContainingTitle("Review"));
  }

  @Test
  public void getInvalidBookByPartialTitle() {
    when(bookRepository.findByTitleContaining("test")).thenReturn(null);
    assertNull(bookService.getByContainingTitle("test"));
  }

  @Test
  public void getValidBookByPartialAuthor() {
    List<Book> books = new ArrayList<>();
    books.add(
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy"));
    when(bookRepository.findByAuthorContaining("John")).thenReturn(books);
    when(bookReviewClient.getAvgBookReviews(12345678900L)).thenReturn(5);
    assertEquals(books, bookService.getByContainingAuthor("John"));
  }

  @Test
  public void getInvalidBookByPartialAuthor() {
    when(bookRepository.findByAuthorContaining("test")).thenReturn(null);
    assertNull(bookService.getByContainingAuthor("test"));
  }

  @Test
  public void getValidBookByPartialIsbn() {
    List<Book> books = new ArrayList<>();
    books.add(
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy"));
    when(bookRepository.findByIsbnContaining(123L)).thenReturn(books);
    when(bookReviewClient.getAvgBookReviews(12345678900L)).thenReturn(5);
    assertEquals(books, bookService.getByContainingIsbn(123L));
  }

  @Test
  public void getInvalidBookByPartialIsbn() {
    when(bookRepository.findByIsbnContaining(987L)).thenReturn(null);
    assertNull(bookService.getByContainingIsbn(987L));
  }

  @Test
  public void getValidBookByCategory() {
    List<Book> books = new ArrayList<>();
    books.add(
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy"));
    when(bookRepository.findByCategory("Comedy")).thenReturn(books);
    when(bookReviewClient.getAvgBookReviews(12345678900L)).thenReturn(5);
    assertEquals(books, bookService.getByCategory("Comedy"));
  }

  @Test
  public void getInvalidBookByCategory() {
    when(bookRepository.findByCategory("test")).thenReturn(null);
    assertNull(bookService.getByCategory("test"));
  }

  @Test
  public void createBook() {
    Book book =
        new Book(
            12345678900L,
            "Review Title",
            "John Doe",
            "Very short blurb of the book.",
            314,
            "https://www.booksite.com",
            5,
            "Comedy");
    when(bookRepository.save(book)).thenReturn(book);
    assertEquals(book, bookService.create(book));
  }
}
