package smistamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import smistamento.entities.Profugo;

@Repository
public interface ProfugoRepo extends JpaRepository<Profugo, String> {
    Profugo findByCodiceConsolato(String codiceConsolato);
    boolean existsByCodiceConsolato(String codiceConsolato);
    Profugo findByEmail(String email);
}
