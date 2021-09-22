package meds.bookaroo.purchaseservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.purchaseservice.controller.PurchaseController;
import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.responseDTO.CreatePurchaseResponseDTO;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchaseResponseDTO;
import meds.bookaroo.purchaseservice.service.PurchaseService;
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

@WebMvcTest({PurchaseController.class})
public class PurchaseControllerTest {

    @MockBean
    PurchaseService purchaseService;

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

}
