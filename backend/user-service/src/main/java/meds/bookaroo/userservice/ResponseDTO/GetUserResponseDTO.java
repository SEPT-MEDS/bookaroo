package meds.bookaroo.userservice.ResponseDTO;

import lombok.Data;
import meds.bookaroo.userservice.model.User;

@Data
public class GetUserResponseDTO extends StdResponseDTO{
    User user;

    public GetUserResponseDTO(boolean isSuccess, User user, String error) {
        super(isSuccess, error);
        this.user = user;
    }
}
