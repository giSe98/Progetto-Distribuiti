package smistamento.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import smistamento.entities.Offerente;
import smistamento.entities.Offerta;
import smistamento.repositories.OfferenteRepo;
import smistamento.repositories.OffertaRepo;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class OffertaService {
    @Autowired
    OffertaRepo offertaRepo;
    @Autowired
    OfferenteRepo offerenteRepo;

    public List<Offerta> getOfferte(int pageNumber, int pageSize) {
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        Page<Offerta> pagedResult = offertaRepo.findAllByOccupataIsFalse(paging);
        if(pagedResult.hasContent()){
            return pagedResult.getContent();
        }
        return new ArrayList<>();
    }

    public List<Offerta> getOfferteByRegione(String regione) {
        return offertaRepo.findByRegione(regione);
    }

    public List<Offerta> getOfferteSearch(String regione, String provincia, String comune, Integer postiLetto, int pageNumber, int pageSize){
        if(regione!="") {
            if (postiLetto != 0) {
                System.out.println(postiLetto);
                if (provincia != "") {
                    if (comune != "") {
                        return offertaRepo.findByRegioneAndProvinciaAndComuneAndPostiLetto(regione, provincia, comune, postiLetto);
                    }
                    return offertaRepo.findByRegioneAndProvinciaAndPostiLetto(regione, provincia, postiLetto);
                }
                return offertaRepo.findByRegioneAndPostiLetto(regione, postiLetto);
            } else {
                if (provincia != "") {
                    if (comune != "") {
                        return offertaRepo.findByRegioneAndProvinciaAndComune(regione, provincia, comune);
                    }
                    return offertaRepo.findByRegioneAndProvincia(regione, provincia);
                }
                return offertaRepo.findByRegione(regione);
            }
        }
        else{
            if(postiLetto!=0){
                return offertaRepo.findByPostiLetto(postiLetto);
            }
            return null;
        }
    }
    public List<Offerta> getOfferteByPostiLetto(int posti) {
        return offertaRepo.findByPostiLetto(posti);
    }


    public Offerta registerOfferta(Offerta offerta, Offerente offerente) throws RuntimeException {
        if(offertaRepo.existsOffertaByIdCasa(offerta.getIdCasa())){
            throw new RuntimeException("Offerta già esistente");
        }
        //String cmd = String.format("python -c \"import sys;from geopy.geocoders import Nominatim;dd={};tmp=Nominatim(user_agent='geoapiExercises').geocode(sys.argv[1], language='en');country=tmp[0].split(', ');dd['country']=country[-1];dd['lat']=tmp[1][0];dd['lon']=tmp[1][1];print(dd);\" \"%s\"",
         //       offerta.getVia()+" "+offerta.getNumeroCivico()+" "+offerta.getComune());
        String cmd = String.format("python -c \"import sys;from geopy.geocoders import Nominatim;dd={};tmp=Nominatim(user_agent='geoapiExercises').geocode(sys.argv[1], language='en');print(tmp.raw['lat'] + ',' + tmp.raw['lon']);\" \"%s\"", offerta.getVia()+" "+offerta.getNumeroCivico()+" "+offerta.getComune());
        Runtime run = Runtime.getRuntime();
        Process pr = null;
        try {
            pr = run.exec(cmd);
            pr.waitFor();
            BufferedReader buf = new BufferedReader(new InputStreamReader(pr.getInputStream()));
            String s = buf.readLine();
            if(s!=null){
                offerta.setLat(Double.parseDouble(s.split(",")[0]));
                offerta.setLon(Double.parseDouble(s.split(",")[1]));
            }
        } catch (Exception e) {
            //e.printStackTrace();
        }
        offerta.setOfferente(offerente);
        offertaRepo.save(offerta);
        return offerta;
    }

    public List<Offerta> getOfferteByUser(String email) {
        Offerente offerente = offerenteRepo.findByEmail(email);
        return offertaRepo.findByOfferente(offerente);
    }

    public void deleteOfferta(Offerta offerta) {
        Offerta offerta1 = offertaRepo.findByIdCasa(offerta.getIdCasa());
        offertaRepo.delete(offerta1);
    }
}
