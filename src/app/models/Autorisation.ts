export class Autorisation {
    idUser:number;
    idDocument :number;
    droitAcces :string;
    constructor( idUser:number,
        idDocument :number,
        droitAcces :string){
            this.idUser=idUser;
            this.idDocument=idDocument;
            this.droitAcces=droitAcces;
        }
}