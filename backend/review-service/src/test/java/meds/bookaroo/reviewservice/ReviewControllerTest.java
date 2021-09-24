package meds.bookaroo.reviewservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.reviewservice.ResponseDTO.CreateReviewResponseDTO;
import meds.bookaroo.reviewservice.ResponseDTO.GetReviewsResponseDTO;
import meds.bookaroo.reviewservice.controller.ReviewController;
import meds.bookaroo.reviewservice.model.Review;
import meds.bookaroo.reviewservice.service.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ReviewController.class})
public class ReviewControllerTest {

  @MockBean
  ReviewService reviewService;
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
  public void getReviewsWithBookIsbn() throws Exception {
    Review review = new Review(1L, 1L, 1L, 1, "Review content");
    List<Review> reviews = new ArrayList<>();
    reviews.add(review);
    when(reviewService.getByEntityID(any())).thenReturn(reviews);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/1/reviews")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetReviewsResponseDTO(reviews))));
  }

  @Test
  public void getReviewsWithUserId() throws Exception {
    Review review = new Review(1L, 1L, 1L, 1, "Review content");
    List<Review> reviews = new ArrayList<>();
    reviews.add(review);
    when(reviewService.getByEntityID(any())).thenReturn(reviews);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/user/1/reviews")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetReviewsResponseDTO(reviews))));
  }

  @Test
  public void createValidListing() throws Exception {
    Review review = new Review(1L, 1L, 1L, 1, "Review content");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new CreateReviewResponseDTO(true, ""))));
  }

  @Test
  public void createInvalidReviewNullEntity() throws Exception {
    Review review = new Review(1L, null, 1L, 1, "Review content");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidReviewNullReviewer() throws Exception {
    Review review = new Review(1L, 1L, null, 1, "Review content");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidReviewMinRating() throws Exception {
    Review review = new Review(1L, 1L, 1L, 0, "Review content");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidReviewMaxRating() throws Exception {
    Review review = new Review(1L, 1L, 1L, 6, "Review content");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidReviewNullContent() throws Exception {
    Review review = new Review(1L, 1L, 1L, 1, null);
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidReviewBlankContent() throws Exception {
    Review review = new Review(1L, 1L, 1L, 1, "");
    when(reviewService.create(any())).thenReturn(review);
    mockMvc.perform(
            MockMvcRequestBuilders.post("/api/review").content(asJsonString(review)).contentType("application/json")
        )
        .andExpect(status().isBadRequest());
  }
}
