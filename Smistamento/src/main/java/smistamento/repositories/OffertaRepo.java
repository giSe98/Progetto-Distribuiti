package smistamento.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import smistamento.entities.Offerente;
import smistamento.entities.Offerta;

import java.util.List;

@Repository
public interface OffertaRepo extends JpaRepository<Offerta, String> {

    List<Offerta> findByRegione(String regione);
    List<Offerta> findByRegioneAndProvincia(String regione,String provincia);
    List<Offerta> findByRegioneAndProvinciaAndComune(String regione,String provincia,String comune);

    boolean existsOffertaByIdCasa(int idCasa);


    List<Offerta> findByOfferente(Offerente offerente);
    Offerta findByIdCasa(int idCasa);

    Page<Offerta> findAllByOccupataIsFalse(Pageable pageable);

    List<Offerta> findByRegioneAndProvinciaAndComuneAndPostiLetto(String regione, String provincia, String comune, Integer postiLetto);

    List<Offerta> findByRegioneAndProvinciaAndPostiLetto(String regione, String provincia, Integer postiLetto);

    List<Offerta> findByRegioneAndPostiLetto(String regione, Integer postiLetto);

    List<Offerta> findByPostiLetto(Integer postiLetto);

}
