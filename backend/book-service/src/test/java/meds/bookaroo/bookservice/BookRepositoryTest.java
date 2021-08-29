package meds.bookaroo.bookservice;

import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.repository.BookRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class BookRepositoryTest {

  private static Validator validator;

  @Autowired
  private BookRepository bookRepository;

  @BeforeAll
  static void setUp() {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    validator = factory.getValidator();
  }

  @AfterEach
  public void destroyAll() {
    bookRepository.deleteAll();
  }

  @Test
  void saveValidBook() {
    Book book = new Book(1000000000L, "Title", "Author", "Blurb", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(0, violations.size());
  }

  @Test
  void saveBookBlankISBN() {
    Book book = new Book(null, "Title", "Author", "Blurb", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookInvalidISBN() {
    Book book = new Book(1L, "Title", "Author", "Blurb", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookBlankTitle() {
    Book book = new Book(1L, "", "Author", "Blurb", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookBlankAuthor() {
    Book book = new Book(1L, "Title", "", "Blurb", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookBlankBlurb() {
    Book book = new Book(1L, "Title", "Author", "", 1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookNegativePages() {
    Book book = new Book(1L, "Title", "Author", "Blurb", -1, "http://url.com", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookBlankUrl() {
    Book book = new Book(1L, "Title", "Author", "Blurb", 1, "", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }

  @Test
  void saveBookBlankCategory() {
    Book book = new Book(1L, "Title", "Author", "Blurb", 1, "", 0, "category");
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertEquals(1, violations.size());
  }
}
