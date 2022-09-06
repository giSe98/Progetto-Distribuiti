package smistamento.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import smistamento.entities.Offerente;
import smistamento.entities.Offerta;
import smistamento.services.AutenticazioneService;
import smistamento.services.OffertaService;
import smistamento.support.ResponseMessage;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/offerte")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OffertaController {
    @Autowired
    private OffertaService offertaService;
    @Autowired
    private AutenticazioneService autenticazioneService;

    @PostMapping("/create")
    public ResponseEntity createOfferta(@RequestBody @Valid Offerta offerta){
        try{
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Offerente offerente = (Offerente) autenticazioneService.userByUsername(name);
            Offerta offerta1 = offertaService.registerOfferta(offerta,offerente);
            return new ResponseEntity(offerta1, HttpStatus.OK);
        }catch (RuntimeException re){
            return new ResponseEntity<>(re.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public List<Offerta> getOfferte(@RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber, @RequestParam(value = "pageSize", defaultValue = "10") int pageSize){
        return offertaService.getOfferte(pageNumber,pageSize);
    }

    @GetMapping("/search")
    public List<Offerta> getOfferteSearch(@RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
                                          @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                                          @RequestParam(value="provincia") Optional<String> provincia,
                                          @RequestParam(value="regione") String regione,
                                          @RequestParam(value="comune") Optional<String> comune,
                                          @RequestParam(value="postiLetto") Optional<Integer> postiLetto){
        return offertaService.getOfferteSearch(regione,provincia.orElse(""),comune.orElse(""),postiLetto.orElse(0),pageNumber,pageSize);
    }

    @GetMapping("/regione")
    public List<Offerta> getOfferteByRegione(@RequestParam(value="regione") String regione){
        return offertaService.getOfferteByRegione(regione);
    }
    @GetMapping("/letto")
    public List<Offerta> getOfferteByPostiLetto(int posti){
        return offertaService.getOfferteByPostiLetto(posti);
    }


    @GetMapping("/user")
    public List<Offerta> getOfferteByUser(@RequestParam(value="email") String email){
        return offertaService.getOfferteByUser(email);
    }

    @PostMapping("/delete")
    public ResponseEntity deleteOfferta(@RequestBody @Valid Offerta offerta){
        offertaService.deleteOfferta(offerta);
        return new ResponseEntity<>(new ResponseMessage("Eliminata con successo"),HttpStatus.OK);
    }
}
