package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Arrays;


@RestController
@RequestMapping("api/file")
@ResponseBody
@RequiredArgsConstructor
public class FileController {
    private static final String pathFile = System.getProperty("user.dir") + File.separator + "backend" + File.separator
                + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "uploads" + File.separator + "avatar";

    @GetMapping(value = "/get-files")
    public String[] getFiles()
    {
        File directory= new File(pathFile);
        return directory.list();

    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName) throws FileNotFoundException {
        String[] filenames = this.getFiles();
        boolean contains = Arrays.asList(filenames).contains(fileName);
        if(!contains) {
            return ResponseHandler.responseBuilder("File Not Found", HttpStatus.NOT_FOUND);
        }
        String filePath = pathFile + File.separator + fileName;
        File file= new File(filePath);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        // Creating a new instance of HttpHeaders Object
        HttpHeaders headers = new HttpHeaders();

        // Setting up values for contentType and headerValue
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseHandler.responseOk("Get Image Successfully", resource);
    }
}
