package meds.bookaroo.purchaseservice;

import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.repository.PurchaseRepository;
import meds.bookaroo.purchaseservice.service.PurchaseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PurchaseServiceTest {

    PurchaseService purchaseService;

    @Mock
    PurchaseRepository purchaseRepository;

    @BeforeEach
    void initUseCase() {
        purchaseService = new PurchaseService(purchaseRepository);
    }

    @Test
    public void getValidPurchaseById() {
        Purchase purchase = new Purchase(1L, 1L, 1L, 1L, "paypal",1L);
        when(purchaseRepository.findById(1L)).thenReturn(java.util.Optional.of(purchase));
        assertEquals(purchase, purchaseService.getByPurchaseId(1L));
    }

    @Test
    public void getInvalidPurchaseById() {
        when(purchaseRepository.findById(1L)).thenReturn(null);
        assertNull(purchaseRepository.findById(1L));
    }

    @Test
    public void getValidListingByBuyerId() {
        List<Purchase> purchases = new ArrayList<>();
        purchases.add(new Purchase(1L, 1L, 1L, 1L, "paypal",1L));
        when(purchaseRepository.findByBuyerId(1L)).thenReturn(purchases);
        assertEquals(purchases, purchaseService.getByBuyerId(1L));
    }

    @Test
    public void getInvalidListingByBuyerId() {
        when(purchaseRepository.findBySellerId(1L)).thenReturn(new ArrayList<>());
        assertEquals(purchaseRepository.findBySellerId(1L).size(), 0);
    }

    @Test
    public void getValidListingBySellerId() {
        List<Purchase> purchases = new ArrayList<>();
        purchases.add(new Purchase(1L, 1L, 1L, 1L, "paypal",1L));
        when(purchaseRepository.findBySellerId(1L)).thenReturn(purchases);
        assertEquals(purchases, purchaseService.getBySellerId(1L));
    }

    @Test
    public void getInvalidListingBySellerId() {
        when(purchaseRepository.findBySellerId(1L)).thenReturn(new ArrayList<>());
        assertEquals(purchaseRepository.findBySellerId(1L).size(), 0);
    }

}
