package smistamento.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import smistamento.entities.Offerente;
import smistamento.repositories.OfferenteRepo;
import smistamento.repositories.UserEntityRepository;

import java.util.List;

@Service
public class OfferenteService {
    @Autowired
    private OfferenteRepo offerenteRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserEntityRepository userEntityRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Offerente registerUser(Offerente offerente) throws RuntimeException {
        if (offerenteRepo.existsByCF(offerente.getCF())){
            throw new RuntimeException("Codice fiscale esistente!");
        }
        if(userEntityRepository.existsByEmail(offerente.getEmail())){
            throw new RuntimeException("User esistente!");
        }
        System.out.println(offerente);
        offerente.setPassword(passwordEncoder.encode(offerente.getPassword()));
        offerenteRepo.save(offerente);
        return offerente;
    }

    public List<Offerente> getAll() {
        return offerenteRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Offerente showByCF(String cf) throws RuntimeException{
        if(!offerenteRepo.existsByCF(cf)) throw new RuntimeException("L'utente non esiste!");
        return offerenteRepo.findByCF(cf);
    }
}
