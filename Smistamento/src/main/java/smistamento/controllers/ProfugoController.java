package smistamento.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import smistamento.entities.Profugo;
import smistamento.entities.UserEntity;
import smistamento.services.AutenticazioneService;
import smistamento.services.ProfugoService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/profugo")
//@CrossOrigin(value = "http://localhost:4200")
public class ProfugoController {
    @Autowired
    private ProfugoService profugoService;
    @Autowired
    private AutenticazioneService autenticazioneService;

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Profugo p){
        try{
            Profugo profugo = profugoService.registerUser(p);
            return new ResponseEntity<>(profugo, HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public List<Profugo> getAll(){
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        //String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return profugoService.getAll();
    }

    @GetMapping("/name")
    public ResponseEntity getUserByCodiceConsolato(@RequestParam(value="codiceConsolato", defaultValue = "") String codiceConsolato){
        try{
            Profugo p = profugoService.showByCodiceConsolato(codiceConsolato);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
