package meds.bookaroo.loginservice.requestDTO;


import java.io.Serializable;

public class UserRequestDTO implements Serializable {
    private String username;

    public UserRequestDTO(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
