package avg.hijob.backend.responses;

import avg.hijob.backend.entities.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Data
public class SkillResponse {
    private int id;
    private String name;

    public SkillResponse(Skill skill) {
        this.id = skill.getId();
        this.name = skill.getName();
    }
}
