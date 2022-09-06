package smistamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import smistamento.entities.Offerente;

@Repository
public interface OfferenteRepo extends JpaRepository<Offerente, String> {
    Offerente findByCF(String cf);
    boolean existsByCF(String cf);
    Offerente findByEmail(String email);
}
