package meds.bookaroo.userservice.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import meds.bookaroo.userservice.model.User;

import java.util.List;

@AllArgsConstructor
@Data
public class GetUsersResponseDTO {
   List<User> users;
}
