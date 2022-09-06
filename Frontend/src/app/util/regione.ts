export class Regione{
    id:BigInteger;
    nome:string;
    latitudine:number;
    longitudine:number;

    public toString = () : string => {
        return `${this.nome}`;
    }
}