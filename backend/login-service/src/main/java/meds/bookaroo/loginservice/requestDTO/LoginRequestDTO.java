package meds.bookaroo.loginservice.requestDTO;

import java.io.Serializable;

public class LoginRequestDTO implements Serializable {
    private String userCredential;
    private String password;

    public String getUserCredential() {
        return userCredential;
    }

    public void setUserCredential(String userCredential) {
        this.userCredential = userCredential;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}