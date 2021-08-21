package medsbookaroo.authservice.exceptionHandler;

import org.springframework.http.HttpStatus;

public class ErrorResponse extends RuntimeException {

    private HttpStatus status;
    private String errorMsg;
    private String developerMsg;

    public ErrorResponse(HttpStatus status, String errorMsg) {
        this.status = status;
        this.errorMsg = errorMsg;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
