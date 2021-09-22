package meds.bookaroo.purchaseservice.service;

import meds.bookaroo.purchaseservice.model.Purchase;
import meds.bookaroo.purchaseservice.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {
  @Autowired
  private PurchaseRepository purchaseRepository;

  public PurchaseService(PurchaseRepository purchaseRepository) { this.purchaseRepository = purchaseRepository; }

  public Purchase create(Purchase purchase) { return purchaseRepository.save(purchase); }

  public Purchase getByPurchaseId(Long purchaseId) { return purchaseRepository.findById(purchaseId).orElse(null); }

  public List<Purchase> getByBuyerId(Long buyerId) { return purchaseRepository.findByBuyerId(buyerId); }

  public List<Purchase> getBySellerId(Long sellerId) { return purchaseRepository.findBySellerId(sellerId); }

  public void deleteByPurchaseId(Long purchaseId) { purchaseRepository.deletePurchaseById(purchaseId); }

  public List<Purchase> getAll() { return purchaseRepository.findAll(); }
}
