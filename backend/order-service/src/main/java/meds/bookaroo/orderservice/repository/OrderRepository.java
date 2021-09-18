package meds.bookaroo.orderservice.repository;

import meds.bookaroo.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByBuyerId(Long buyerId);

  List<Order> findBySellerId(Long sellerId);

  void deleteOrderById(Long orderId);
}
