package avg.hijob.backend.services;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String email, String name, String token) throws MessagingException;
}
