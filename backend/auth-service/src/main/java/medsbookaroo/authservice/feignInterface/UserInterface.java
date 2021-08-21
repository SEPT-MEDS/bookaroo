package medsbookaroo.authservice.feignInterface;

import static medsbookaroo.authservice.constants.MicroServiceConstants.*;
import medsbookaroo.authservice.responseDTO.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@FeignClient(name = USER_MICROSERVICE)
@Service
@RequestMapping(value = BASE_API)
public interface UserInterface {
    @RequestMapping(value = UserMicroServiceConstants.FETCH_USER_BY_USERNAME)
    Optional<UserResponseDTO> fetchUserByUsername(@PathVariable("username") String username);
}
