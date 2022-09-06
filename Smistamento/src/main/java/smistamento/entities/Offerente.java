package smistamento.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.GregorianCalendar;
import java.util.List;

@Entity
@Table(name = "offerente")
public class Offerente extends UserEntity {

    @Basic
    @Column(nullable = false)
    private String CF;

    @OneToMany(targetEntity = Offerta.class, mappedBy = "offerente", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Offerta> offerte;

    public Offerente() {
    }

    public Offerente(String CF, String nome, String cognome, String email, String password, GregorianCalendar dataNascita, String telefono, List<Offerta> offerte) {
        super(nome,cognome,email,password,dataNascita,telefono);
        this.CF = CF;
        this.offerte = offerte;
    }

    public String getCF() {
        return CF;
    }

    public void setCF(String CF) {
        this.CF = CF;
    }

    public List<Offerta> getOfferte() {
        return offerte;
    }

    public void setOfferte(List<Offerta> offerte) {
        this.offerte = offerte;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Offerente offerente = (Offerente) o;

        if (CF != null ? !CF.equals(offerente.CF) : offerente.CF != null) return false;
        if (getNome() != null ? !getNome().equals(offerente.getNome()) : offerente.getNome() != null) return false;
        if (getCognome() != null ? !getCognome().equals(offerente.getCognome()) : offerente.getCognome() != null) return false;
        if (getEmail() != null ? !getEmail().equals(offerente.getEmail()) : offerente.getEmail() != null) return false;
        if (getPassword() != null ? !getPassword().equals(offerente.getPassword()) : offerente.getPassword() != null) return false;
        if (getDataNascita() != null ? !getDataNascita().equals(offerente.getDataNascita()) : offerente.getDataNascita() != null)
            return false;
        if (getTelefono() != null ? !getTelefono().equals(offerente.getTelefono()) : offerente.getTelefono() != null) return false;
        return offerte != null ? offerte.equals(offerente.offerte) : offerente.offerte == null;
    }

    @Override
    public int hashCode() {
        int result = CF != null ? CF.hashCode() : 0;
        result = 31 * result + (getNome() != null ? getNome().hashCode() : 0);
        result = 31 * result + (getCognome() != null ? getCognome().hashCode() : 0);
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getDataNascita() != null ? getDataNascita().hashCode() : 0);
        result = 31 * result + (getTelefono() != null ? getTelefono().hashCode() : 0);
        result = 31 * result + (offerte != null ? offerte.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Offerente{" +
                "CF='" + CF + '\'' +
                ", nome='" + getNome() + '\'' +
                ", cognome='" + getCognome() + '\'' +
                ", email='" + getEmail() + '\'' +
                ", password='" + getPassword() + '\'' +
                ", dataNascita=" + getDataNascita() +
                ", telefono='" + getTelefono() + '\'' +
                ", offerte=" + offerte +
                '}';
    }

}
