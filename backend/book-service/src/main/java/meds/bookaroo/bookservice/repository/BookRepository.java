package meds.bookaroo.bookservice.repository;

import meds.bookaroo.bookservice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByIsbn(Long isbn);
    void deleteByIsbn(Long isbn);
}

