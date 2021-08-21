package medsbookaroo.authservice.exceptionHandler;

import org.springframework.http.HttpStatus;

public class UnauthorisedException extends RuntimeException {
    private ErrorResponse errorResponse;

    public UnauthorisedException(String message) {
        super(message);
        errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, message);
    }

    public ErrorResponse getErrorResponse() {
        return errorResponse;
    }

    public void setErrorResponse(ErrorResponse errorResponse) {
        this.errorResponse = errorResponse;
    }
}
