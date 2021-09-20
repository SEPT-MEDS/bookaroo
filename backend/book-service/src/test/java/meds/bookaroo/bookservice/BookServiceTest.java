package meds.bookaroo.bookservice;


import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import meds.bookaroo.bookservice.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

  BookService bookService;

  @Mock
  BookRepository bookRepository;

  @BeforeEach
  void initUseCase() {
    bookService = new BookService(bookRepository);
  }

  @Test
  public void getValidBookByIsbn() {
    Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
    when(bookRepository.findByIsbn(12345678900L)).thenReturn(book);
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
    books.add(new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy"));
    when(bookRepository.findByTitleContaining("Book")).thenReturn(books);
    assertEquals(books, bookService.getByContainingTitle("Book"));
  }

  @Test
  public void getInvalidBookByPartialTitle() {
    when(bookRepository.findByTitleContaining("test")).thenReturn(null);
    assertNull(bookService.getByContainingTitle("test"));
  }

  @Test
  public void getValidBookByPartialAuthor() {
    List<Book> books = new ArrayList<>();
    books.add(new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy"));
    when(bookRepository.findByAuthorContaining("John")).thenReturn(books);
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
    books.add(new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy"));
    when(bookRepository.findByIsbnContaining(123L)).thenReturn(books);
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
    books.add(new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy"));
    when(bookRepository.findByCategory("Comedy")).thenReturn(books);
    assertEquals(books, bookService.getByCategory("Comedy"));
  }

  @Test
  public void getInvalidBookByCategory() {
    when(bookRepository.findByCategory("test")).thenReturn(null);
    assertNull(bookService.getByCategory("test"));
  }

  @Test
  public void createBook() {
    Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
    when(bookRepository.save(book)).thenReturn(book);
    assertEquals(book, bookService.create(book));
  }
}
