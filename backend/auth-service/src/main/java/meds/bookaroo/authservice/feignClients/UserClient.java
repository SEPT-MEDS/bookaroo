package meds.bookaroo.authservice.feignClients;

import meds.bookaroo.authservice.responseDTO.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {
    @RequestMapping("/api/user/byUsername/{username}")
    Optional<UserResponseDTO> getUserByUsername(@PathVariable String username);
}
