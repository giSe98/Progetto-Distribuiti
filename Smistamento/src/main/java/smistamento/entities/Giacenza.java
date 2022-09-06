package smistamento.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "giacenza")
public class Giacenza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;

    @ManyToOne()
    @JoinColumn(name = "profugo")
    private Profugo profugo;

    @ManyToOne()
    @JoinColumn(name = "offerta")
    private Offerta offerta;

    @Basic
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date inizio;

    @Basic
    @Column(nullable = true)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date fine;

    public Giacenza() {}

    public Giacenza(int id, Profugo profugo, Offerta offerta, Date inizio) {
        this.id = id;
        this.profugo = profugo;
        this.offerta = offerta;
        this.inizio = inizio;
    }

    public Giacenza( Profugo profugo, Offerta offerta, Date inizio, Date fine) {
        this.profugo = profugo;
        this.offerta = offerta;
        this.inizio = inizio;
        this.fine = fine;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Profugo getProfugo() {
        return profugo;
    }

    public void setProfugo(Profugo profugo) {
        this.profugo = profugo;
    }

    public Offerta getOfferta() {
        return offerta;
    }

    public void setOfferta(Offerta offerta) {
        this.offerta = offerta;
    }

    public Date getInizio() {
        return inizio;
    }

    public void setInizio(Date inizio) {
        this.inizio = inizio;
    }

    public Date getFine() {
        return fine;
    }

    public void setFine(Date fine) {
        this.fine = fine;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Giacenza giacenza = (Giacenza) o;

        if (id != giacenza.id) return false;
        if (inizio != giacenza.inizio) return false;
        if (fine != giacenza.fine) return false;
        if (profugo != null ? !profugo.equals(giacenza.profugo) : giacenza.profugo != null) return false;
        return offerta != null ? offerta.equals(giacenza.offerta) : giacenza.offerta == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (profugo != null ? profugo.hashCode() : 0);
        result = 31 * result + (offerta != null ? offerta.hashCode() : 0);
        result = (int) (31 * result + fine.getTime());
        return result;
    }

    @Override
    public String toString() {
        return "Giacenza{" +
                "id=" + id +
                ", profugo=" + profugo +
                ", offerta=" + offerta +
                ", inizio=" + inizio +
                ", fine=" + fine +
                '}';
    }
}
