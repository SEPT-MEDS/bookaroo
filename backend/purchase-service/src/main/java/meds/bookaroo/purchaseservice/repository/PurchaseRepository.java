package meds.bookaroo.purchaseservice.repository;

import meds.bookaroo.purchaseservice.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  List<Purchase> findByBuyerId(Long buyerId);

  List<Purchase> findBySellerId(Long sellerId);

  void deletePurchaseById(Long purchaseId);
}
