package avg.hijob.backend.exceptions;


import org.springframework.http.HttpStatus;

public record Exception(String message, Throwable throwable, HttpStatus httpStatus) {
}
