package meds.bookaroo.purchaseservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.purchaseservice.controller.PurchaseController;
import meds.bookaroo.purchaseservice.feignClients.Listing;
import meds.bookaroo.purchaseservice.feignClients.ListingClient;
import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchaseResponseDTO;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchasesResponseDTO;
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
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, "paypalData", 1L);
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
    Purchase purchase = new Purchase(1L, null, 1L, 1L,"paypalData",  1L);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankBuyerId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, null, 1L, "paypalData", 1L);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankSellerId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, null, "paypalData", 1L);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankPayPalData() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, null, null);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidPurchaseBlankPurchaseCreationTimeId() throws Exception {
    Purchase purchase = new Purchase(1L, 1L, 1L, 1L, "paypalData", null);
    when(purchaseService.create(any())).thenReturn(purchase);
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, true, "url");
    when(listingClient.getListing(1L)).thenReturn(Optional.ofNullable(listing));
    mockMvc.perform(
                    MockMvcRequestBuilders.post("/api/purchase").content(asJsonString(purchase)).contentType("application/json")
            )
            .andExpect(status().isBadRequest());
  }

  @Test
  public void getPurchaseWithBuyerId() throws Exception {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L, "paypalData", 1L));
    when(purchaseService.getByBuyerId(1L)).thenReturn(purchases);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase/byBuyerId/1").content(asJsonString(new GetPurchasesResponseDTO(purchases))).contentType("application/json")
    ).andExpect(status().isOk());
  }

  @Test
  public void getInvalidPurchaseWithBuyerId() throws Exception {
    when(purchaseService.getByBuyerId(1L)).thenReturn(new ArrayList<>());
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase/byBuyerId/1").content(asJsonString(new GetPurchasesResponseDTO(new ArrayList<>()))).contentType("application/json")
    ).andExpect(status().isOk());
  }

  @Test
  public void getPurchaseWithSellerId() throws Exception {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L, "paypalData", 1L));
    when(purchaseService.getBySellerId(1L)).thenReturn(purchases);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase/bySellerId/1").content(asJsonString(new GetPurchasesResponseDTO(purchases))).contentType("application/json")
    ).andExpect(status().isOk());
  }

  @Test
  public void getInvalidPurchaseWithSellerId() throws Exception {
    when(purchaseService.getBySellerId(1L)).thenReturn(new ArrayList<>());
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase/byBuyerId/1").content(asJsonString(new GetPurchasesResponseDTO(new ArrayList<>()))).contentType("application/json")
    ).andExpect(status().isOk());
  }

  @Test
  public void getAllPurchases() throws Exception {
    List<Purchase> purchases = new ArrayList<>();
    purchases.add(new Purchase(1L, 1L, 1L, 1L,"paypalData",  1L));
    when(purchaseService.getAll()).thenReturn(purchases);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase").content(asJsonString(new GetPurchasesResponseDTO(purchases))).contentType("application/json")
    ).andExpect(status().isOk());
  }

  @Test
  public void getInvalidAllPurchases() throws Exception {
    List<Purchase> purchases = new ArrayList<>();
    when(purchaseService.getAll()).thenReturn(new ArrayList<>());
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/purchase").content(asJsonString(new GetPurchasesResponseDTO(new ArrayList<>()))).contentType("application/json")
    ).andExpect(status().isOk());
  }
}
