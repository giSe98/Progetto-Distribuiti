
import { Offerta } from "../offerta";

export class RequestGiacenza{
    private offerta:Offerta;
    private inizio:string;
    private fine:string;


    public getofferta(): Offerta
 {
        return this.offerta;
    }

    public setofferta(offerta: Offerta
) {
        this.offerta = offerta;
    }

    public getinizio(): string
 {
        return this.inizio;
    }

    public setinizio(inizio: string
) {
        this.inizio = inizio;
    }

    public getfine(): string
 {
        return this.fine;
    }

    public setfine(fine: string
) {
        this.fine = fine;
    }

}