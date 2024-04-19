export class Metadata {
    id :number;
    keyName:string;
    value : string;
    documentId :number;
    constructor( id :number,
        keyName:string,
        value : string,
        documentId :number){
            this.id=id;
            this.keyName=keyName;
            this.value=value;
            this.documentId=documentId;

    }
}