package meds.bookaroo.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import meds.bookaroo.userservice.controller.UserController;
import meds.bookaroo.userservice.model.User;
import meds.bookaroo.userservice.model.UserType;
import meds.bookaroo.userservice.responseDTO.CreateUserResponseDTO;
import meds.bookaroo.userservice.responseDTO.GetUserResponseDTO;
import meds.bookaroo.userservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({UserController.class})
public class UserControllerTest {
  @MockBean
  UserService userService;
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
  public void saveUser() throws Exception {
    User user = new User(null, "test@me.com", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    when(userService.create(any())).thenReturn(user);
    mockMvc.perform(
        MockMvcRequestBuilders.post("/api/user/signup")
            .content(asJsonString(user))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new CreateUserResponseDTO(true, ""))));
  }

  @Test
  public void getUserWithId() throws Exception {
    User user = new User(1L, "test@me.com", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    when(userService.getById(any())).thenReturn(user);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/user/1")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(new GetUserResponseDTO(true, user, ""))));
  }

  @Test
  public void getUserWithUsername() throws Exception {
    User user = new User(1L, "test@me.com", "username", "password", true, UserType.CUSTOMER, "firstName", "lastName", "", "", "");
    when(userService.getByUsername(any())).thenReturn(user);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/user/byUsername/username")
    )
        .andExpect(status().isOk())
        .andExpect(content().string(asJsonString(user)));
  }

  @Test
  public void getInvalidUserWithUsername() throws Exception {
    when(userService.getByUsername(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/user/byUsername/notusername")
    )
        .andExpect(status().isNotFound())
        .andExpect(content().string(""));
  }

  @Test
  public void getInvalidUserWithId() throws Exception {
    when(userService.getById(any())).thenReturn(null);
    mockMvc.perform(
        MockMvcRequestBuilders.get("/api/user/2")
    )
        .andExpect(status().isNotFound())
        .andExpect(content().string(asJsonString(new GetUserResponseDTO(false, null, "No user with id 2 exists"))));
  }
}
