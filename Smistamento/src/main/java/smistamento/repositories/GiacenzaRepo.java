package smistamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import smistamento.entities.Giacenza;
import smistamento.entities.Offerta;
import smistamento.entities.Profugo;

import java.util.List;

public interface GiacenzaRepo extends JpaRepository<Giacenza, String> {

    List<Giacenza> findByProfugo(Profugo p);
}
