package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestLevel;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.services.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/level")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService levelService;

    @GetMapping("")
    public ResponseEntity<Object> findAllLevels() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,levelService.findAllLevels());

    }

    @GetMapping("/getLevelById/{id}")
    public ResponseEntity<Object> getLevelById(@PathVariable Integer id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, levelService.getLevelById(id));
    }

    @PostMapping("/createLevel")
    public ResponseEntity<Object> create(@RequestBody RequestLevel requestLevel){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, levelService.createLevel(requestLevel));
    }

    @PutMapping("/updateLevel/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody RequestLevel requestLevel){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, levelService.updateLevel(id, requestLevel));
    }

    @PutMapping("/deleteLevel/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, levelService.deleteLevel(id));
    }
}
