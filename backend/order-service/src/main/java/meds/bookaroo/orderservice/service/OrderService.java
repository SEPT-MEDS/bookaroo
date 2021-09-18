package meds.bookaroo.orderservice.service;

import meds.bookaroo.orderservice.model.Order;
import meds.bookaroo.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
  @Autowired
  private OrderRepository orderRepository;

  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public Order create(Order order) {
    return orderRepository.save(order);
  }

  public Order getByOrderId(Long orderId) {
    return orderRepository.getById(orderId);
  }

  public List<Order> getByBuyerId(Long buyerId) {
    return orderRepository.findByBuyerId(buyerId);
  }

  public List<Order> getBySellerId(Long sellerId) {
    return orderRepository.findBySellerId(sellerId);
  }

  public void delete(Long orderId) {
    orderRepository.deleteOrderById(orderId);
  }

  public List<Order> getAll() {
    return orderRepository.findAll();
  }
}
