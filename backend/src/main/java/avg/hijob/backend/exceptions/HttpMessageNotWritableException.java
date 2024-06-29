package avg.hijob.backend.exceptions;

public class HttpMessageNotWritableException extends RuntimeException{

        public HttpMessageNotWritableException(String message){
            super(message);
        }

        public HttpMessageNotWritableException(String message, Throwable cause){
            super(message,cause);
        }
}
