package meds.bookaroo.loginservice.exceptions;

import org.springframework.http.HttpStatus;

import java.io.Serializable;

public class ErrorResponse implements Serializable {

    private String errorMsg;
    private HttpStatus responseStatus;
    private int responseCode;

    public ErrorResponse(String errorMsg, HttpStatus responseStatus, int responseCode) {
        this.errorMsg = errorMsg;
        this.responseStatus = responseStatus;
        this.responseCode = responseCode;
    }

    public ErrorResponse() {

    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public HttpStatus getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(HttpStatus responseStatus) {
        this.responseStatus = responseStatus;
    }

    public int getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(int responseCode) {
        this.responseCode = responseCode;
    }
}

