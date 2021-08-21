package meds.bookaroo.bookservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ISBNAlreadyExistsException extends RuntimeException {

    public ISBNAlreadyExistsException(String message)  {
        super(message);
    }
}
