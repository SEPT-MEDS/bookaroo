package meds.bookaroo.reviewservice.repository;

import meds.bookaroo.reviewservice.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
  List<Review> findAllByEntityId(Long id);

  @Query(value = "SELECT AVG(r.rating) FROM Review r WHERE r.entityId = ?1")
  Integer findAvgByEntityId(Long entityId);
}
