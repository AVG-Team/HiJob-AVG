package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.ContractType;
import avg.hijob.backend.enums.ContractTypeEnum;
import avg.hijob.backend.repositories.ContractTypeRepository;
import avg.hijob.backend.repositories.JobContractTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContractTypeFaker implements CommandLineRunner {

    @Autowired
    private final ContractTypeRepository contractTypeRepository;

    @Override
    public void run(String... args) throws Exception {
        if(contractTypeRepository.findAll().isEmpty()){
            ContractTypeEnum[] contractTypeEnums = ContractTypeEnum.values();
            for(ContractTypeEnum contractTypeEnum : contractTypeEnums){
                ContractType contractType = new ContractType();
                contractType.setName(contractTypeEnum.name());
                contractTypeRepository.save(contractType);
            }
        }
    }
}
