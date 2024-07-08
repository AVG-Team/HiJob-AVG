package avg.hijob.backend.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends RuntimeException{

    public NotFoundException(String message){
        super(message);
    }

    public NotFoundException(String message, Throwable cause){
        super(message,cause);
    }

    public NotFoundException(String message, HttpStatus status){
        super(message);
    }
}
