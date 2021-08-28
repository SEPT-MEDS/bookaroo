package meds.bookaroo.bookservice;


import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import meds.bookaroo.bookservice.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

   BookService bookService;
   BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

   @Mock
   BookRepository bookRepository;

   @BeforeEach
   void initUseCase() {
      bookService = new BookService();
   }

   @Test
   public void getValidBookByFullIsbn() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByIsbn(12345678900L)).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByIsbn(12345678900L) != null);
   }

   @Test
   public void getValidBookByPartialIsbn() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByIsbn(12345L)).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByIsbn(12345L) != null);
   }

   @Test
   public void getValidBookByFullTitle() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByTitle("Book Title")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByTitle("Book Title") != null);
   }

   @Test
   public void getValidBookByPartialTitle() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByTitle("Book")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByTitle("Book") != null);
   }

   @Test
   public void getValidBookByFullAuthor() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByAuthor("John Doe")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByJohn("John Doe") != null);
   }

   @Test
   public void getValidBookByPartialAuthor() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByAuthor("John")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByAuthor("John") != null);
   }

   @Test
   public void getValidBookByFullCategory() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByCategory("Comedy")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByCategory("Comedy") != null);
   }
   @Test
   public void getValidBookByPartialCategory() {
      // isbn, title, author, blurb, numPages, url, rating
      Book book = new Book(12345678900L, "Book Title", "John Doe", "Very short blurb of the book.", 314, "https://www.booksite.com", 5, "Comedy");
      when(bookRepository.findByCategory("Com")).thenReturn(book); // not sure if the .thenReturn() part is correct
      assertThat(bookService.getByCategory("Com") != null);
   }

}
