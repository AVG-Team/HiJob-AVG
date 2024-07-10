package avg.hijob.backend.services;

import avg.hijob.backend.entities.About;
import avg.hijob.backend.repositories.AboutRepository;
import avg.hijob.backend.requests.RequestAbout;
import avg.hijob.backend.responses.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AboutService {
    private final AboutRepository aboutRepository;

    public About getAbout() {
        return aboutRepository.findAll().stream().findFirst().orElse(new About());
    }

    public MessageResponse saveAbout(RequestAbout request) {
        About about = aboutRepository.findAll().stream().findFirst().orElse(new About());
        about.setTitle(request.getTitle());
        about.setNameCompany(request.getNameCompany());
        about.setAddress(request.getAddress());
        about.setIframeGoogleMap(request.getIframeGoogleMap());
        about.setPhone(request.getPhone());
        about.setEmail(request.getEmail());
        about.setWebsite(request.getWebsite());
        about.setDescription(request.getDescription());

        if (request.getAddress().isEmpty()
                || request.getDescription().isEmpty()
                || request.getEmail().isEmpty()
                || request.getIframeGoogleMap().isEmpty()
                || request.getNameCompany().isEmpty()
                || request.getPhone().isEmpty()
                || request.getTitle().isEmpty()
                || request.getWebsite().isEmpty()
        ) {
            aboutRepository.save(about);
        }
        return new MessageResponse(HttpStatus.OK, "Saved successfully");
    }
}
