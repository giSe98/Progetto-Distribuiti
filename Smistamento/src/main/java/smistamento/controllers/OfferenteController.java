package smistamento.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smistamento.entities.Offerente;
import smistamento.services.OfferenteService;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/offerente")
@CrossOrigin(value = "http://localhost:4200")
public class OfferenteController {
    @Autowired
    private OfferenteService offerenteService;

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Offerente o){
        try{
            Offerente offerente = offerenteService.registerUser(o);
            return new ResponseEntity<>(offerente, HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public List<Offerente> getAll(){
        return offerenteService.getAll();
    }

    @GetMapping("/name")
    public ResponseEntity getUserByCF(@RequestParam(value="cf", defaultValue = "") String cf){
        try{
            Offerente o = offerenteService.showByCF(cf);
            return new ResponseEntity<>(o, HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
