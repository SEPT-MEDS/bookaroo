package meds.bookaroo.orderservice.controller;

import meds.bookaroo.orderservice.feignClients.Listing;
import meds.bookaroo.orderservice.feignClients.ListingClient;
import meds.bookaroo.orderservice.model.Order;
import meds.bookaroo.orderservice.requestDTO.UpdateStatusDTO;
import meds.bookaroo.orderservice.responseDTO.CreateOrderResponseDTO;
import meds.bookaroo.orderservice.responseDTO.GetOrderResponseDTO;
import meds.bookaroo.orderservice.responseDTO.GetOrdersResponseDTO;
import meds.bookaroo.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class OrderController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private ListingClient listingClient;

  // Create an order
  @PostMapping("/api/order")
  public ResponseEntity<?> addOrder(@RequestBody @Valid Order order) {
    System.out.println("test");
    orderService.create(order);
    Listing listing = listingClient.getListing(order.getListingId());
    listing.setIsVisible(false);
    listingClient.updateListing(listing);
    return ResponseEntity.ok(new CreateOrderResponseDTO(true, ""));
  }

  // Get order by order id
  @GetMapping("/api/order/{orderid}")
  public ResponseEntity<?> getOrderById(@PathVariable Long orderid) {
    Order order = orderService.getByOrderId(orderid);
    System.out.println("test");
    if (order != null) {
      System.out.println("HEYYY");
      return ResponseEntity.ok(new GetOrderResponseDTO(true, order, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GetOrderResponseDTO(false, null, "No order with id " + orderid));
    }
  }

  // Get orders by buyer id
  @GetMapping("/api/order/byBuyerId/{buyerid}")
  public ResponseEntity<?> getOrderByBuyerId(@PathVariable Long buyerid) {
    List<Order> orders = orderService.getByBuyerId(buyerid);
    return ResponseEntity.ok(new GetOrdersResponseDTO(orders));
  }

  // Get orders by seller id
  @GetMapping("/api/order/bySellerId/{sellerid}")
  public ResponseEntity<?> getOrderBySellerId(@PathVariable Long sellerid) {
    List<Order> orders = orderService.getBySellerId(sellerid);
    return ResponseEntity.ok(new GetOrdersResponseDTO(orders));
  }

  // Get all orders
  @GetMapping("/api/orders")
  public ResponseEntity<?> getAllOrders() {
    List<Order> orders = orderService.getAll();
    return ResponseEntity.ok(new GetOrdersResponseDTO(orders));
  }

  // Delete an order by its id
  @DeleteMapping("/api/order/{orderid}")
  public ResponseEntity<?> deleteOrderById(@PathVariable Long orderid) {
    Order order = orderService.getByOrderId(orderid);
    if (order != null && order.getOrderCreationTime() > 1) {
      Listing listing = listingClient.getListing(order.getListingId());
      listing.setIsVisible(true);
      listingClient.updateListing(listing);
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PatchMapping("/api/order/")
  public ResponseEntity<?> updateOrderStatus(@RequestBody UpdateStatusDTO updateStatusDTO) {
    Order order = orderService.getByOrderId(updateStatusDTO.getOrderId());
    if (order != null) {
      order.setStatus(updateStatusDTO.getStatus());
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}

