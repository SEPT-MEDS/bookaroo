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

import static org.assertj.core.api.Java6Assertions.assertThat;

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
    Book book = new Book(1000000000L, "Test Book", "Author", "Blurb", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(0);
  }

  @Test
  void saveBookBlankISBN() {
    Book book = new Book(null, "Test Book", "Author", "Blurb", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookInvalidISBN() {
    Book book = new Book(1L, "Test Book", "Author", "Blurb", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookBlankTitle() {
    Book book = new Book(1000000000L, "", "Author", "Blurb", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookBlankAuthor() {
    Book book = new Book(1000000000L, "title", "", "Blurb", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookBlankBlurb() {
    Book book = new Book(1000000000L, "title", "Author", "", 1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookNegativePages() {
    Book book = new Book(1000000000L, "title", "Author", "blurb", -1, "http://url.com", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }

  @Test
  void saveBookBlankUrl() {
    Book book = new Book(1000000000L, "title", "Author", "blurb", 1, "", 0);
    Set<ConstraintViolation<Book>> violations = validator.validate(book);
    assertThat(violations.size()).isEqualTo(1);
  }
}
