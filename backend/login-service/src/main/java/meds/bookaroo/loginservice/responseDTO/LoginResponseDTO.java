package meds.bookaroo.loginservice.responseDTO;

import java.io.Serializable;

public class LoginResponseDTO implements Serializable {
    private String token;

    public LoginResponseDTO(String token) {
        this.token = token;
    }

    public LoginResponseDTO() {

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}