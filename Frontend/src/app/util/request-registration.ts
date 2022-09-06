export class RequestRegistration{

    private nome: string;
    private cognome: string;
    private email:string;
    private password:string;
    private dataNascita:Date;
    private telefono:string;
    private ruolo:string;
    private codiceConsolato:string;
    private cf:string;


    public getDataDiNascita(): Date
    {
        return this.dataNascita;
    }
    public setDataDiNascita(data: Date)
    {
        this.dataNascita = data;
    }

    public getTelefono(): string{
        return this.telefono;
    }

    public setTelefono(telefono: string){
        this.telefono=telefono;
    }
    public getNome(): string
 {
        return this.nome;
    }

    public setNome(nome: string
) {
        this.nome = nome;
    }

    public getCognome(): string
 {
        return this.cognome;
    }

    public setCognome(cognome: string
) {
        this.cognome = cognome;
    }

    public getEmail(): string
 {
        return this.email;
    }

    public setEmail(email: string
) {
        this.email = email;
    }

    public getPassword(): string
 {
        return this.password;
    }

    public setPassword(password: string
) {
        this.password = password;
    }

    public getRuolo(): string
 {
        return this.ruolo;
    }

    public setRuolo(ruolo: string
) {
        this.ruolo = ruolo;
    }

    public getConsolato(): string
 {
        return this.codiceConsolato;
    }

    public setConsolato(consolato: string
) {
        this.codiceConsolato = consolato;
    }

    public getCodiceF(): string {
        return this.cf;
    }

    public setCodiceF(codiceF: string) {
        this.cf = codiceF;
    }


    
}