package meds.bookaroo.listingservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.listingservice.controller.ListingController;
import meds.bookaroo.listingservice.model.Listing;
import meds.bookaroo.listingservice.responseDTO.CreateListingResponseDTO;
import meds.bookaroo.listingservice.responseDTO.GetListingResponseDTO;
import meds.bookaroo.listingservice.service.ListingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ListingController.class})
public class ListingControllerTest {

  @MockBean
  ListingService listingService;
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
  public void getListingWithId() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, false, true, "url");
    when(listingService.getByListingId(any())).thenReturn(listing);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/listing/1")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetListingResponseDTO(true, listing, ""))));
  }

  @Test
  public void getInvalidListingWithId() throws Exception {
    when(listingService.getByListingId(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/listing/2")
    )
        .andExpect(status().isNotFound())
        .andExpect(content().string(asJsonString(new GetListingResponseDTO(false, null, "No listing with id 2"))));
  }

  @Test
  public void createInvalidListingBlankISBN() throws Exception {
    Listing listing = new Listing(1L, null, 1L, 50, false, true, "url");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingShortISBN() throws Exception {
    Listing listing = new Listing(1L, 1L, 1L, 50, false, true, "url");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingNullSellerId() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, null, 50, false, true, "url");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingNullIsSwap() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, null, true, "url");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingNullIsVisible() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, true, null, "url");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingBlankUrl() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, true, true, "");
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidListingNullUrl() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, true, true, null);
    when(listingService.create(any())).thenReturn(listing);
    System.out.println(asJsonString(listing));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createValidListing() throws Exception {
    Listing listing = new Listing(1L, 1000000000L, 1L, 50, true, true, "url");
    when(listingService.create(any())).thenReturn(listing);
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/listing").content(asJsonString(listing)).contentType("application/json")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new CreateListingResponseDTO(true, ""))));
  }
}
