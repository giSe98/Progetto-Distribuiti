package smistamento.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smistamento.entities.Giacenza;
import smistamento.entities.Offerta;
import smistamento.entities.Profugo;
import smistamento.repositories.GiacenzaRepo;
import smistamento.repositories.OffertaRepo;
import smistamento.repositories.ProfugoRepo;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Service
public class GiacenzaService {
    @Autowired
    private GiacenzaRepo giacenzaRepo;
    @Autowired
    private ProfugoRepo profugoRepo;
    @Autowired
    private OffertaRepo offertaRepo;


    public List<Giacenza> getGiacenzeUser(String email){
        Profugo profugo = profugoRepo.findByEmail(email);
        return giacenzaRepo.findByProfugo(profugo);
    }
    public void deleteGiacenza(Giacenza giacenza){
        offertaRepo.findByIdCasa(giacenza.getOfferta().getIdCasa()).setOccupata(false);
        giacenzaRepo.delete(giacenza);
    }
    public Giacenza registerGiancenza(int idCasa, Profugo profugo, Date inizio, Date fine) {
        Offerta offerta = offertaRepo.findByIdCasa(idCasa);
        if(offerta.isOccupata()) {
            throw new RuntimeException("Casa già occupata");
        }
        for(Giacenza g : profugo.getGiacenze()){
            System.out.println(g.getFine());

            if(g.getFine()!=null){
                if(g.getFine().after(inizio))
                    throw new RuntimeException("Giacenza esistente nelle date");
            }
            else{
                if(g.getInizio().before(inizio)) throw new RuntimeException("Giacenza esistente nelle date");
            }
        }
        offerta.setOccupata(true);
        Giacenza giacenza = new Giacenza(profugo,offerta,inizio,fine);
        giacenzaRepo.save(giacenza);
        return giacenza;
    }

    public Giacenza terminaGiacenza(Giacenza giacenza) {
        giacenza.setFine(new Date());
        giacenzaRepo.save(giacenza);
        return giacenza;
    }

    public Giacenza modificaGiacenza(Giacenza giacenza) {
        giacenzaRepo.save(giacenza);
        return giacenza;
    }
}
