import { Citta } from "./citta";
import { Offerente } from "./offerente";

export class Offerta{
    idCasa:BigInteger;
    postiLetto:BigInteger;
    lat:number;
    lon:number;
    numeroCivico:BigInteger;
    via:string;
    occupata:boolean;
    provincia:String;
    comune:String;
    regione:String;
    imageName:string;
    descrizione:string;
    offerente:Offerente;
}