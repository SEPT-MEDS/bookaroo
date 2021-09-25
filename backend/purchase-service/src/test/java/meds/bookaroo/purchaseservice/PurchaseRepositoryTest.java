package meds.bookaroo.purchaseservice;

import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.repository.PurchaseRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@DataJpaTest

public class PurchaseRepositoryTest {

    private static Validator validator;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @AfterEach
    public void destroyAll() {
        purchaseRepository.deleteAll();
    }

    @Test
    void saveValidPurchase() {
        Purchase purchase = new Purchase(1L, 1L, 1L, 1L, 1L);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(0, violations.size());
    }

    @Test
    void savePurchaseBlankId() {
        Purchase purchase = new Purchase(null, 1L, 1L, 1L, 1L);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(0, violations.size());
    }

    @Test
    void savePurchaseBlankListingId() {
        Purchase purchase = new Purchase(1L, null, 1L, 1L, 1L);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(1, violations.size());
    }

    @Test
    void savePurchaseBlankBuyerId() {
        Purchase purchase = new Purchase(1L, 1L, null, 1L, 1L);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(1, violations.size());
    }

    @Test
    void savePurchaseBlankSellerId() {
        Purchase purchase = new Purchase(1L, 1L, 1L, null, 1L);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(1, violations.size());
    }

    @Test
    void savePurchaseBlankPurchaseCreationTime() {
        Purchase purchase = new Purchase(1L, 1L, 1L, 1L, null);
        Set<ConstraintViolation<Purchase>> violations = validator.validate(purchase);
        assertEquals(1, violations.size());
    }
}
