package meds.bookaroo.loginservice.responseDTO;

import org.apache.tomcat.jni.User;

import java.io.Serializable;


public class UserResponseDTO implements Serializable {

    private String emailAddress;
    private Long id;
    private String password;
    private Integer loginAttempt;
    private Character status;

    public UserResponseDTO(String emailAddress, Long id, String password, Integer loginAttempt, Character status) {
        this.emailAddress = emailAddress;
        this.id = id;
        this.password = password;
        this.loginAttempt = loginAttempt;
        this.status = status;
    }

    public UserResponseDTO(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getLoginAttempt() {
        return loginAttempt;
    }

    public void setLoginAttempt(Integer loginAttempt) {
        this.loginAttempt = loginAttempt;
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }
}
