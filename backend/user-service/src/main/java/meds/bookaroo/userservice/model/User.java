package meds.bookaroo.userservice.model;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Data
public class User {
  private @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Email(message = "Email needs to be a valid email")
  @NotBlank(message = "Email is required")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "username is required")
  @Column(unique = true)
  private String username;

  @NotBlank(message = "Password field is required")
  private String password;

  private boolean isEnabled;
  private UserType type;

  @NotBlank(message = "First name is required")
  private String firstName;

  @NotBlank(message = "Last name is required")
  private String lastName;

  private String phoneNumber;
  private String address;
  private String ABN;
}
