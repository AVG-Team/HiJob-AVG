package avg.hijob.backend.services;

import avg.hijob.backend.responses.ReCaptchaResponse;

public interface ReCaptchaService {
    ReCaptchaResponse verify(String response);
}
