export class Document {
    idDocument : number;
    nom : string;
    type:string;
    dateCreation: Date;
    urlDocument: string;
    constructor( idDocument : number,
        nom : string,
        type:string,
        dateCreation: Date,
        urlDocument: string)
        {
            this.idDocument=idDocument;
            this.nom=nom;
            this.type=type;
            this.dateCreation=dateCreation;
            this.urlDocument=urlDocument;

    }

}