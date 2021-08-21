package meds.bookaroo.loginservice.feignInterface;

import meds.bookaroo.loginservice.constants.MicroServiceConstants;
import meds.bookaroo.loginservice.requestDTO.UserRequestDTO;
import meds.bookaroo.loginservice.responseDTO.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "USER-SERVICE")
@Service
public interface UserInterface {
    @GetMapping(value = "/")
    UserResponseDTO getUserWithUsername(@RequestBody UserRequestDTO requestDTO);

    @PostMapping(value = MicroServiceConstants.UserMicroServiceConstants.SEARCH_USER)
    void updateUser(@RequestBody UserResponseDTO responseDTO);
}