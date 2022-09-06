package smistamento.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import smistamento.support.AuthenticationBean;
import smistamento.support.ResponseMessage;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/basicauth")
@CrossOrigin(value = "http://localhost:4200")
public class BasicAuthController {
    @GetMapping()
    public AuthenticationBean basicauth(){
        return new AuthenticationBean("You are authenticated");
    }

    @GetMapping(value="/ruolo")
    public ResponseEntity getRuolo(){
        return new ResponseEntity(SecurityContextHolder.getContext().getAuthentication().getAuthorities().toArray()[0],HttpStatus.OK);
    }
}
