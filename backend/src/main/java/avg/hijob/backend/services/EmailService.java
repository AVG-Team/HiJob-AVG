package avg.hijob.backend.services;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String email, String name, String token) throws MessagingException;
    void sendEmailWithPassword(String email, String name, String password) throws MessagingException;
}
