export class RequestOfferta{
    private postiLetto:BigInteger;
    private lat:BigInteger;
    private lon:BigInteger;
    private numeroCivico:BigInteger;
    private via:string;
    private occupata:boolean;
    private provincia:string;
    private regione:string;
    private comune:string;
    private descrizione:string;
    private imageName:string;

    public getDescrizione(): string{
        return this.descrizione;
    }
    public setDescrizione(descrizione:string){
        this.descrizione=descrizione;
    }
    public getImageName(): string{
        return this.imageName;
    }
    public setImageName(imageName:string){
        this.imageName=imageName;
    }
    public getpostiLetto(): BigInteger
 {
        return this.postiLetto;
    }

    public setpostiLetto(postiLetto: BigInteger
) {
        this.postiLetto = postiLetto;
    }

    public getlat(): BigInteger
 {
        return this.lat;
    }

    public setlat(lat: BigInteger
) {
        this.lat = lat;
    }

    public getlon(): BigInteger
 {
        return this.lon;
    }

    public setlon(lon: BigInteger
) {
        this.lon = lon;
    }

    public getnumeroCivico(): BigInteger
 {
        return this.numeroCivico;
    }

    public setnumeroCivico(numeroCivico: BigInteger
) {
        this.numeroCivico = numeroCivico;
    }

    public getvia(): string
 {
        return this.via;
    }

    public setvia(via: string
) {
        this.via = via;
    }

    public getoccupata(): boolean
 {
        return this.occupata;
    }

    public setoccupata(occupata: boolean
) {
        this.occupata = occupata;
    }

    public getprovincia(): string
 {
        return this.provincia;
    }

    public setprovincia(provincia: string
) {
        this.provincia = provincia;
    }

    public getregione(): string
 {
        return this.regione;
    }

    public setregione(regione: string
) {
        this.regione = regione;
    }

    public getcomune(): string {
        return this.comune;
    }

    public setcomune(comune: string) {
        this.comune = comune;
    }

}