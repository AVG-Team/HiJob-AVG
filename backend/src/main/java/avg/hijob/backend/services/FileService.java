package avg.hijob.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {
    public final static String fileSystemStatic = System.getProperty("user.dir") + File.separator + "backend" + File.separator
            + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator;

    public String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }

    public String savaFileStatic(MultipartFile file, String folderName) {
        String folderPath = fileSystemStatic + folderName;
        System.out.println(folderPath);
        try {
            byte[] bytes = file.getBytes();
            String fileName = System.currentTimeMillis() + "." + getFileExtension(file.getOriginalFilename());
            Path path = Paths.get(folderPath + File.separator + fileName);
            System.out.println(path);
            Files.write(path, bytes);

            return fileName;
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }
}
