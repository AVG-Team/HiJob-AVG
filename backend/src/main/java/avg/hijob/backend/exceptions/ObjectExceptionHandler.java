package avg.hijob.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ObjectExceptionHandler {

    @ExceptionHandler(value = {NotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleNotFoundException(
            NotFoundException notFoundException){
        Exception exception = new Exception(
                notFoundException.getMessage(),
                notFoundException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(exception,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleBadRequestException(
            BadRequestException badRequestException){
        Exception exception = new Exception(
                badRequestException.getMessage(),
                badRequestException.getCause(),
                HttpStatus.BAD_REQUEST
        );
        return new ResponseEntity<>(exception,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ConflictException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<Object> handleConflictException(
            ConflictException conflictException){
        Exception exception = new Exception(
                conflictException.getMessage(),
                conflictException.getCause(),
                HttpStatus.CONFLICT
        );
        return new ResponseEntity<>(exception,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = {UnauthorizedException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> handleUnauthorizedException(
            UnauthorizedException unauthorizedException){
        Exception exception = new Exception(
                unauthorizedException.getMessage(),
                unauthorizedException.getCause(),
                HttpStatus.UNAUTHORIZED
        );
        return new ResponseEntity<>(exception,HttpStatus.UNAUTHORIZED);
    }
}
