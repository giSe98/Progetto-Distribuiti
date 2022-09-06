package smistamento.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import smistamento.entities.Giacenza;
import smistamento.entities.Offerente;
import smistamento.entities.Offerta;
import smistamento.entities.Profugo;
import smistamento.services.AutenticazioneService;
import smistamento.services.GiacenzaService;
import smistamento.services.OffertaService;
import smistamento.support.ResponseMessage;

import javax.validation.Valid;
import java.util.GregorianCalendar;
import java.util.List;

@RestController
@RequestMapping("/giacenza")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GiacenzaController {
    @Autowired
    private GiacenzaService giacenzaService;
    @Autowired
    private AutenticazioneService autenticazioneService;
    @Autowired
    private OffertaService offertaService;
    @PostMapping("/register")
    public ResponseEntity createGiacenza(@RequestBody @Valid Giacenza giacenza1){
        try {
            System.out.println(giacenza1);
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Profugo profugo = (Profugo) autenticazioneService.userByUsername(name);
            Giacenza giacenza = giacenzaService.registerGiancenza(giacenza1.getOfferta().getIdCasa(),profugo,giacenza1.getInizio(),giacenza1.getFine());
            return new ResponseEntity(giacenza, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/user")
    public List<Giacenza> getGiacenzaByUser(@RequestParam(value="email") String email){
        return giacenzaService.getGiacenzeUser(email);
    }

    @PostMapping("/delete")
    public ResponseEntity deleteGiacenza(@RequestBody @Valid Giacenza giacenza){
        giacenzaService.deleteGiacenza(giacenza);
        return new ResponseEntity<>(new ResponseMessage("Eliminata con successo"),HttpStatus.OK);
    }

    @PostMapping("/termina")
    public Giacenza terminaGiacenza(@RequestBody @Valid Giacenza giacenza){
        return giacenzaService.terminaGiacenza(giacenza);

    }
    @PostMapping("/modifica")
    public Giacenza modificaGiacenza(@RequestBody @Valid Giacenza giacenza){
        System.out.println("vada");
        return giacenzaService.modificaGiacenza(giacenza);
    }
}
