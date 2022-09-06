package smistamento.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import smistamento.entities.Profugo;
import smistamento.repositories.ProfugoRepo;
import smistamento.repositories.UserEntityRepository;

import java.util.List;

@Service
public class ProfugoService {
    @Autowired
    private ProfugoRepo profugoRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserEntityRepository userEntityRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Profugo registerUser(Profugo profugo) throws RuntimeException {
        if (profugoRepo.existsByCodiceConsolato(profugo.getCodiceConsolato())){
            throw new RuntimeException("User esistente!");
        }
        if(userEntityRepository.existsByEmail(profugo.getEmail())){
            throw new RuntimeException("User esistente!");
        }
        System.out.println(profugo);
        profugo.setPassword(passwordEncoder.encode(profugo.getPassword()));
        profugoRepo.save(profugo);
        return profugo;
    }

    public List<Profugo> getAll() {
        return profugoRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Profugo showByCodiceConsolato(String codiceConsolato) throws RuntimeException{
        if(!profugoRepo.existsByCodiceConsolato(codiceConsolato)) throw new RuntimeException("L'utente non esiste!");
        return profugoRepo.findByCodiceConsolato(codiceConsolato);
    }
}
