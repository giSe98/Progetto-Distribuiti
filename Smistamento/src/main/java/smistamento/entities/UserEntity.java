package smistamento.entities;

import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.GregorianCalendar;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Basic
    @Column(nullable = false)
    private String nome;

    @Basic
    @Column(nullable = false)
    private String cognome;

    @Basic
    @Column(nullable = false)
    private String email;

    @Basic
    @Column(nullable = false)
    private String password;

    @Basic
    @Column(nullable = false)
    private GregorianCalendar dataNascita;

    @Basic
    @Column(nullable = false)
    private String telefono;

    public UserEntity(){}

    public UserEntity(String nome, String cognome, String email, String password, GregorianCalendar dataNascita, String telefono) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.dataNascita = dataNascita;
        this.telefono = telefono;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public GregorianCalendar getDataNascita() {
        return dataNascita;
    }

    public void setDataNascita(GregorianCalendar dataNascita) {
        this.dataNascita = dataNascita;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

}
