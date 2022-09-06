package smistamento.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.GregorianCalendar;
import java.util.List;

@Entity
@Table(name= "profugo")
public class Profugo extends UserEntity {


    @Basic
    @Column(nullable = false)
    private String codiceConsolato;

    @OneToMany(targetEntity = Giacenza.class, mappedBy = "profugo", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Giacenza> giacenze;


    public Profugo(String nome, String cognome, String email, String password, GregorianCalendar dataNascita, String codiceConsolato, String telefono) {
        super(nome,cognome,email,password,dataNascita,telefono);
        this.codiceConsolato = codiceConsolato;
    }
    public Profugo() {}

    public String getCodiceConsolato() {
        return codiceConsolato;
    }

    public void setCodiceConsolato(String codiceConsolato) {
        this.codiceConsolato = codiceConsolato;
    }

    public List<Giacenza> getGiacenze() {
        return giacenze;
    }

    public void setGiacenze(List<Giacenza> giacenza) {
        this.giacenze = giacenza;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Profugo profugo = (Profugo) o;

        if (getNome() != null ? !getNome().equals(profugo.getNome()) : profugo.getNome() != null) return false;
        if (getCognome() != null ? !getCognome().equals(profugo.getCognome()) : profugo.getCognome() != null) return false;
        if (getEmail() != null ? !getEmail().equals(profugo.getEmail()) : profugo.getEmail() != null) return false;
        if (getPassword() != null ? !getPassword().equals(profugo.getPassword()) : profugo.getPassword() != null) return false;
        if (getDataNascita() != null ? !getDataNascita().equals(profugo.getDataNascita()) : profugo.getDataNascita() != null) return false;
        if (codiceConsolato != null ? !codiceConsolato.equals(profugo.codiceConsolato) : profugo.codiceConsolato != null)
            return false;
        if (getTelefono() != null ? !getTelefono().equals(profugo.getTelefono()) : profugo.getTelefono() != null) return false;
        return giacenze != null ? giacenze.equals(profugo.giacenze) : profugo.giacenze == null;
    }

    @Override
    public int hashCode() {
        int result = getNome() != null ? getNome().hashCode() : 0;
        result = 31 * result + (getCognome() != null ? getCognome().hashCode() : 0);
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getDataNascita() != null ? getDataNascita().hashCode() : 0);
        result = 31 * result + (codiceConsolato != null ? codiceConsolato.hashCode() : 0);
        result = 31 * result + (getTelefono() != null ? getTelefono().hashCode() : 0);
        result = 31 * result + (giacenze != null ? giacenze.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Profugo{" +
                "nome='" + getNome() + '\'' +
                ", cognome='" + getCognome() + '\'' +
                ", email='" + getEmail() + '\'' +
                ", password='" + getPassword() + '\'' +
                ", dataNascita=" + getDataNascita() +
                ", codiceConsolato='" + codiceConsolato + '\'' +
                ", telefono='" + getTelefono() + '\'' +
                ", giacenza=" + giacenze +
                '}';
    }
}