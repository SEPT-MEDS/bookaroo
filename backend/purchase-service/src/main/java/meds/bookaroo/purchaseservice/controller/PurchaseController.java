package meds.bookaroo.purchaseservice.controller;

import meds.bookaroo.purchaseservice.feignClients.ListingClient;
import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.requestDTO.UpdateListingStatusDTO;
import meds.bookaroo.purchaseservice.responseDTO.CreatePurchaseResponseDTO;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchaseResponseDTO;
import meds.bookaroo.purchaseservice.responseDTO.GetPurchasesResponseDTO;
import meds.bookaroo.purchaseservice.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PurchaseController {

  @Autowired private PurchaseService purchaseService;

  @Autowired private ListingClient listingClient;

  // Create a purchase
  @PostMapping("/api/purchase")
  public ResponseEntity<?> addPurchase(@RequestBody @Valid Purchase purchase) {
    purchaseService.create(purchase);
    // Update the listing linked to the service as invisible
    UpdateListingStatusDTO request = new UpdateListingStatusDTO(purchase.getListingId(), false);
    listingClient.updateListing(request);
    return ResponseEntity.ok(new CreatePurchaseResponseDTO(true, ""));
  }

  // Get purchase by purchase id
  @GetMapping("/api/purchase/{purchaseid}")
  public ResponseEntity<?> getPurchaseById(@PathVariable Long purchaseid) {
    Purchase purchase = purchaseService.getByPurchaseId(purchaseid);
    if (purchase != null) {
      return ResponseEntity.ok(new GetPurchaseResponseDTO(true, purchase, ""));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new GetPurchaseResponseDTO(false, null, "No purchase with id " + purchaseid));
    }
  }

  // Get purchases by buyer id
  @GetMapping("/api/purchase/byBuyerId/{buyerid}")
  public ResponseEntity<?> getPurchaseByBuyerId(@PathVariable Long buyerid) {
    List<Purchase> purchases = purchaseService.getByBuyerId(buyerid);
    return ResponseEntity.ok(new GetPurchasesResponseDTO(purchases));
  }

  // Get purchases by seller id
  @GetMapping("/api/purchase/bySellerId/{sellerid}")
  public ResponseEntity<?> getPurchaseBySellerId(@PathVariable Long sellerid) {
    List<Purchase> purchases = purchaseService.getBySellerId(sellerid);
    return ResponseEntity.ok(new GetPurchasesResponseDTO(purchases));
  }

  // Get all purchases
  @GetMapping("/api/purchases")
  public ResponseEntity<?> getAllPurchases() {
    List<Purchase> purchases = purchaseService.getAll();
    return ResponseEntity.ok(new GetPurchasesResponseDTO(purchases));
  }

  // Delete a purchase by its id
  @DeleteMapping("/api/purchase/{purchaseid}")
  public ResponseEntity<?> deletePurchaseById(@PathVariable Long purchaseid) {
    Purchase purchase = purchaseService.getByPurchaseId(purchaseid);
    // Ensure that x number of hours havent already passed
    if (purchase != null && purchase.getPurchaseCreationTime() > 1) {
      // Make the listing for the purchase invisible
      UpdateListingStatusDTO request = new UpdateListingStatusDTO(purchase.getListingId(), true);
      listingClient.updateListing(request);
      // Remove the purchase from the DB
      purchaseService.deleteByPurchaseId(purchaseid);
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}
