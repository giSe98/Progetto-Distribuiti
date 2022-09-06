import { Offerta } from "./offerta";
import { Profugo } from "./profugo";

export class Giacenza{
    id:BigInteger;
    profugo:Profugo;
    offerta:Offerta;
    inizio:Date;
    fine:Date;
}