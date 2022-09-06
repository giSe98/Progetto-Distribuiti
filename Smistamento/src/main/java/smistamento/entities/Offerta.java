package smistamento.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.GregorianCalendar;
import java.util.List;

@Entity
@Table(name = "offerta")
public class Offerta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int idCasa;

    @Basic
    @Column(nullable = false)
    private int postiLetto;

    @Basic
    @Column(nullable = false)
    private double lat;

    @Basic
    @Column(nullable = false)
    private double lon;

    @Basic
    @Column(nullable = false)
    private int numeroCivico;

    @Basic
    @Column(nullable = false)
    private String via;

    @Basic
    @Column(nullable = false)
    private boolean occupata;

    @Basic
    @Column(nullable = false)
    private String provincia;

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    @Basic
    @Column(nullable = false, columnDefinition="varchar(2000)")
    private String descrizione;

    @Basic
    @Column(nullable = false)
    private String comune;

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    @Basic
    @Column(nullable = false)
    private String imageName;

    @Basic
    @Column(nullable = false)
    private String regione;

    @ManyToOne()
    @JoinColumn(name = "offerente")
    private Offerente offerente;

    @OneToMany(targetEntity = Giacenza.class, mappedBy = "offerta", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Giacenza> giacenze;

    public Offerta() {}

    public Offerta(int idCasa, int postiLetto, double lat, double lon, int numeroCivico,
                   String via, boolean occupata,  String regione,String provincia, String comune,
                   String descrizione,String imageName, Offerente offerente, List<Giacenza> giacenze) {
        this.idCasa = idCasa;
        this.postiLetto = postiLetto;
        this.lat = lat;
        this.lon = lon;
        this.numeroCivico = numeroCivico;
        this.via = via;
        this.occupata = occupata;
        this.provincia = provincia;
        this.comune = comune;
        this.regione = regione;
        this.descrizione = descrizione;
        this.imageName = imageName;
        this.offerente = offerente;
        this.giacenze = giacenze;
    }

    public String getComune() {
        return comune;
    }

    public void setComune(String comune) {
        this.comune = comune;
    }

    public String getRegione() {
        return regione;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }
    public int getIdCasa() {
        return idCasa;
    }

    public void setIdCasa(int idCasa) {
        this.idCasa = idCasa;
    }

    public int getPostiLetto() {
        return postiLetto;
    }

    public void setPostiLetto(int postiLetto) {
        this.postiLetto = postiLetto;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public int getNumeroCivico() {
        return numeroCivico;
    }

    public void setNumeroCivico(int numeroCivico) {
        this.numeroCivico = numeroCivico;
    }

    public String getVia() {
        return via;
    }

    public void setVia(String via) {
        this.via = via;
    }

    public boolean isOccupata() {
        return occupata;
    }

    public void setOccupata(boolean occupata) {
        this.occupata = occupata;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public Offerente getOfferente() {
        return offerente;
    }

    public void setOfferente(Offerente offerente) {
        this.offerente = offerente;
    }

    public List<Giacenza> getGiacenze() {
        return giacenze;
    }

    public void setGiacenze(List<Giacenza> giacenze) {
        this.giacenze = giacenze;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Offerta offerta = (Offerta) o;

        if (idCasa != offerta.idCasa) return false;
        if (postiLetto != offerta.postiLetto) return false;
        if (Double.compare(offerta.lat, lat) != 0) return false;
        if (Double.compare(offerta.lon, lon) != 0) return false;
        if (numeroCivico != offerta.numeroCivico) return false;
        if (occupata != offerta.occupata) return false;
        if (via != null ? !via.equals(offerta.via) : offerta.via != null) return false;
        if (provincia != null ? !provincia.equals(offerta.provincia) : offerta.provincia != null) return false;
        if (regione != null ? !regione.equals(offerta.regione) : offerta.regione != null) return false;
        if (comune != null ? !comune.equals(offerta.comune) : offerta.comune != null) return false;
        if (offerente != null ? !offerente.equals(offerta.offerente) : offerta.offerente != null) return false;
        return giacenze != null ? giacenze.equals(offerta.giacenze) : offerta.giacenze == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = idCasa;
        result = 31 * result + postiLetto;
        temp = Double.doubleToLongBits(lat);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(lon);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + numeroCivico;
        result = 31 * result + (via != null ? via.hashCode() : 0);
        result = 31 * result + (occupata ? 1 : 0);
        result = 31 * result + (provincia != null ? provincia.hashCode() : 0);
        result = 31 * result + (offerente != null ? offerente.hashCode() : 0);
        result = 31 * result + (giacenze != null ? giacenze.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Offerta{" +
                "idCasa=" + idCasa +
                ", postiLetto=" + postiLetto +
                ", lat=" + lat +
                ", lon=" + lon +
                ", numeroCivico=" + numeroCivico +
                ", via='" + via + '\'' +
                ", occupata=" + occupata +
                ", comune=" + comune +
                ", citta=" + provincia +
                ", regione="+regione+
                ", descrizione="+descrizione+
                ", offerente=" + offerente +
                ", giacenze=" + giacenze +
                '}';
    }
}
