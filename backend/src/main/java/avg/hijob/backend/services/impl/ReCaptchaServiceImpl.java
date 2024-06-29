package avg.hijob.backend.services.impl;

import avg.hijob.backend.responses.ReCaptchaResponse;
import avg.hijob.backend.services.ReCaptchaService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.logging.Logger;

@Service
public class ReCaptchaServiceImpl implements ReCaptchaService {
    private static final Dotenv dotenv = Dotenv.load();
    private static final String RECAPTCHA_SITE = dotenv.get("GOOGLE_RECAPTCHA_ID");
    private static final String RECAPTCHA_SECRET = dotenv.get("GOOGLE_RECAPTCHA_SECRET");
    private static final String RECAPTCHA_THRESHOLD = dotenv.get("GOOGLE_RECAPTCHA_THRESHOLD");
    private static final String RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";

    private static final Logger log = Logger.getLogger(ReCaptchaServiceImpl.class.getName());

    @Override
    public ReCaptchaResponse verify(String response) {
        try {
            URI uri = URI.create(RECAPTCHA_URL + "?secret=" + RECAPTCHA_SECRET + "&response=" + response);
            RestTemplate restTemplate = new RestTemplate();
            ReCaptchaResponse reCaptchaResponse = restTemplate.getForObject(uri, ReCaptchaResponse.class);
            if (reCaptchaResponse != null) {
                System.out.println("Recaptcha : " + reCaptchaResponse.toString());
                float threshold = Float.parseFloat(RECAPTCHA_THRESHOLD);
                if (reCaptchaResponse.getScore() < threshold && !reCaptchaResponse.isSuccess()) {
                    System.out.println("score : " + reCaptchaResponse.getScore() + " threshold : " + threshold);
                    reCaptchaResponse.setSuccess(false);
                    log.warning("ReCaptcha score is too low: " + reCaptchaResponse.getScore());
                } else {
                    reCaptchaResponse.setSuccess(true);
                }
            }
            return reCaptchaResponse;
        } catch (Exception e) {
            log.severe("Error verifying ReCaptcha: " + e.getMessage());
            ReCaptchaResponse reCaptchaResponse = new ReCaptchaResponse();
            reCaptchaResponse.setSuccess(false);
            return reCaptchaResponse;
        }
    }
}
