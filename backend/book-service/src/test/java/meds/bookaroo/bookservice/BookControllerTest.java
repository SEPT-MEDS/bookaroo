package meds.bookaroo.bookservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.bookservice.controller.BookController;
import meds.bookaroo.bookservice.model.Book;
import meds.bookaroo.bookservice.responseDTO.CreateBookResponseDTO;
import meds.bookaroo.bookservice.responseDTO.GetBookResponseDTO;
import meds.bookaroo.bookservice.responseDTO.GetBooksResponseDTO;
import meds.bookaroo.bookservice.service.BookService;
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

@WebMvcTest({BookController.class})
public class BookControllerTest {

  @MockBean
  BookService bookService;
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
  public void getBookWithISBN() throws Exception {
    Book book = new Book(1000000000L, "Title", "Author", "Blurb", 1, "", 0, "category");
    when(bookService.getByIsbn(any())).thenReturn(book);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/1000000000")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBookResponseDTO(true, book, ""))));
  }

  @Test
  public void getInvalidBookWithISBN() throws Exception {
    when(bookService.getByIsbn(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/1")
    )
        .andExpect(status().isNotFound())
        .andExpect(content().string(asJsonString(new GetBookResponseDTO(false, null, "No book with isbn 1 exists"))));
  }

  @Test
  public void getBookWithPartialTitle() throws Exception {
    List<Book> books = new ArrayList<>();
    books.add(new Book(1000000000L, "Title", "Author", "Blurb", 1, "", 0, "category"));
    when(bookService.getByContainingTitle(any())).thenReturn(books);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingTitle/t")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(books))));
  }

  @Test
  public void getInvalidBookWithPartialTitle() throws Exception {
    List<Book> books = new ArrayList<>();
    when(bookService.getByContainingTitle(any())).thenReturn(books);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingTitle/title")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(books))));
  }

  @Test
  public void getBookWithPartialAuthor() throws Exception {
    List<Book> books = new ArrayList<>();
    books.add(new Book(1000000000L, "Title", "Author", "Blurb", 1, "", 0, "category"));
    when(bookService.getByContainingAuthor(any())).thenReturn(books);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingAuthor/au")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(books))));
  }

  @Test
  public void getInvalidBookWithPartialAuthor() throws Exception {
    when(bookService.getByContainingTitle(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingAuthor/ti")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(new ArrayList<>()))));
  }

  @Test
  public void getBookWithPartialIsbn() throws Exception {
    List<Book> books = new ArrayList<>();
    books.add(new Book(1000000000L, "Title", "Author", "Blurb", 1, "", 0, "category"));
    when(bookService.getByContainingIsbn(any())).thenReturn(books);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingIsbn/100")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(books))));
  }

  @Test
  public void getInvalidBookWithPartialIsbn() throws Exception {
    when(bookService.getByContainingTitle(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/book/containingIsbn/1091230")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetBooksResponseDTO(new ArrayList<>()))));
  }

  @Test
  public void createBook() throws Exception {
    Book book = new Book(1000000000L, "Title", "Author", "Blurb", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new CreateBookResponseDTO(true, ""))));
  }

  @Test
  public void createInvalidBookBlankISBN() throws Exception {
    Book book = new Book(null, "title", "author", "Blurb", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookShortISBN() throws Exception {
    Book book = new Book(1L, "title", "author", "Blurb", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookBlankTitle() throws Exception {
    Book book = new Book(1000000000L, "", "Author", "Blurb", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookBlankAuthor() throws Exception {
    Book book = new Book(1000000000L, "title", "", "Blurb", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookBlankBlurb() throws Exception {
    Book book = new Book(1000000000L, "title", "author", "", 1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookNegativePages() throws Exception {
    Book book = new Book(1000000000L, "title", "author", "blurb", -1, "Test", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookBlankURL() throws Exception {
    Book book = new Book(1000000000L, "title", "author", "blurb", -1, "", 1, "category");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }

  @Test
  public void createInvalidBookBlankCategory() throws Exception {
    Book book = new Book(1000000000L, "title", "author", "blurb", -1, "url", 1, "");
    when(bookService.create(any())).thenReturn(book);
    System.out.println(asJsonString(book));
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/book").content(asJsonString(book)).contentType("application/json")
    )
        .andExpect(status().isBadRequest());
  }
}
