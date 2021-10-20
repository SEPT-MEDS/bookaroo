package meds.bookaroo.bookservice.repository;

import meds.bookaroo.bookservice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
  Book findByIsbn(Long isbn);

  List<Book> findByTitleContaining(String title);

  List<Book> findByAuthorContaining(String author);

  List<Book> findByIsbnContaining(Long isbn);

  List<Book> findByCategory(String category);
}
