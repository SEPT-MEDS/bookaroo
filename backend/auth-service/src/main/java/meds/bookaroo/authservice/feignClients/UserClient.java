package meds.bookaroo.authservice.feignClients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {

  // Access User repository using Username
  @RequestMapping("/api/user/byUsername/{username}")
  Optional<CustomUserDetails> getUserByUsername(@PathVariable String username);
}
