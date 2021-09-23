package meds.bookaroo.purchaseservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.purchaseservice.controller.PurchaseController;
import meds.bookaroo.purchaseservice.feignClients.Listing;
import meds.bookaroo.purchaseservice.feignClients.ListingClient;
import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchaseResponseDTO;
import meds.bookaroo.purchaseservice.service.PurchaseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({PurchaseController.class})
public class PurchaseControllerTest {

  @MockBean
  PurchaseService purchaseService;

  @MockBean
  ListingClient listingClient;

  @Autowired
  private MockMvc mockMvc;

  public static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Test
  public void getPurchaseWithId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, 1L, "status");
    when(purchaseService.getByPurchaseId(any())).thenReturn(purchase);
    mockMvc.perform(
            MockMvcRequestBuilders.get("/api/purchase/1")
        )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetPurchaseResponseDTO(true, purchase, ""))));
  }

  @Test
  public void getInvalidPurchaseWithId() throws Exception {
    when(purchaseService.getByPurchaseId(any())).thenReturn(null);
    mockMvc.perform(
            MockMvcRequestBuilders.get("/api/purchase/2")
        )
        .andExpect(status().isNotFound())
        .andExpect(content().string(asJsonString(new GetPurchaseResponseDTO(false, null, "No purchase with id 2"))));
  }

  @Test
  public void createInvalidPurchaseBlankListingId() throws Exception {
    Purchase purchase = new Purchase(1L, null, 1L, 1L, 1L, "status");
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    System.out.println(asJsonString(purchase));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankBuyerId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, null, 1L, 1L, "status");
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    System.out.println(asJsonString(purchase));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankSellerId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, null, 1L, "status");
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    System.out.println(asJsonString(purchase));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankPurchaseCreationTimeId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, null, "status");
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    System.out.println(asJsonString(purchase));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankStatus() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, 1L, null);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    System.out.println(asJsonString(purchase));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void getPurchaseWithBuyerId() {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L, 1L, "status"));
    when(purchaseService.getByBuyerId(1L)).thenReturn(purchases);
    assertEquals(purchases, purchaseService.getByBuyerId(1L));
  }

  @Test
  public void getInvalidPurchaseWithBuyerId() {
    when(purchaseService.getByBuyerId(1L)).thenReturn(new ArrayList<>());
    assertEquals(0, purchaseService.getByBuyerId(1L).size());
  }

  @Test
  public void getPurchaseWithSellerId() {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L, 1L, "status"));
    when(purchaseService.getBySellerId(1L)).thenReturn(purchases);
    assertEquals(purchases, purchaseService.getBySellerId(1L));
  }

  @Test
  public void getInvalidPurchaseWithSellerId() {
    when(purchaseService.getBySellerId(1L)).thenReturn(new ArrayList<>());
    assertEquals(0, purchaseService.getBySellerId(1L).size());
  }

  @Test
  public void getAllPurchases() {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L, 1L, "status"));
    when(purchaseService.getAll()).thenReturn(purchases);
    assertEquals(purchases, purchaseService.getAll());
  }

  @Test
  public void getInvalidAllPurchases() {
    when(purchaseService.getAll()).thenReturn(new ArrayList<>());
    assertEquals(0, purchaseService.getAll().size());
  }

}
