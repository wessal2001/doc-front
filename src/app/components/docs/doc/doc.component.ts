import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/Document';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { AutorisationService } from '../../../services/autorisation.service';
import { Autorisation } from '../../../models/Autorisation';
import { Metadata } from '../../../models/Metadata';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.css'
})
export class DocComponent implements OnInit { 
  docs: Document[] = [];
  selectedFile: File | null = null;
  showShareDialog: boolean = false;
  showUploadDialog:boolean=false;
  users: User[]=[];
  idDoc!:number;
  accessRight!:string;
  userId!: number;
  nom!: string;
  date!: Date;
  type!: string;
  deletionMessage!: string;
  metadataFields: Metadata[]=[];
  docId!: number;
  showMetadataFields:boolean=true;
  currentuserId: number=0;

 
  constructor(
    private documentService: DocumentService,private userService:AuthService,private autorityService:AutorisationService,private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentuserId= params['userId'];;
      console.log(this.currentuserId);
    });
    this.getAllDocs();
  }
  hasReadRight(doc: Document):boolean {
    return true;
    }
    hasWriteRight(doc: Document):boolean {
      return true;
    }
    hasShareRight(doc: Document):boolean {
      return true;
    }
  toggleMetadataFields() {
    this.showMetadataFields = !this.showMetadataFields;
  }
  addMetadataField(): void {
    this.metadataFields.push(new Metadata(0,'','',0));
  }
  getAllDocs() {
    this.documentService.getListDocs().subscribe(data => {
      this.docs=data;
      this.docs.forEach(doc => {
        console.log(doc); // Afficher chaque élément du tableau dans la console
      });
    });
  }
 
  deleteDoc(id: number) {
    this.documentService.deleteData(id).subscribe(
      (response) => {
      },
      (error) => {
        console.error(error);
      }
    );
    this.documentService.deleteDocument(id).subscribe(
      (response)=>{

      },
      (error)=>{

      }
    )
  }
  getAuthorities(idDoc:number,idUser:number):any{
    this.autorityService.getAuthoritiesByUserAndDoc(idDoc,idUser).subscribe((response)=>{
      return response;
    },
    (error)=>{

    }
  )

  }
 
  openUploadDialog() {
    this.showUploadDialog=true;
    const uploadDialog = document.getElementById('uploadDialog');
    if (uploadDialog) {
      uploadDialog.style.display = 'block';
    } else {
      console.error("Element with id 'uploadDialog' not found");
    }
  }
 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
     if(this.selectedFile!=null)
      formData.append('file', this.selectedFile);
      this.documentService.addDoc(formData).subscribe(data => {  
        this.docId=data.idDocument;
        console.log(data.idDocument);
      })
   
  }
 
  save() {
 
    this.metadataFields.forEach((metadata=> {
      metadata.documentId=this.docId;
     this.documentService.saveMetadata(metadata).subscribe(response => {      
    });
    }));
    const uploadDialog = document.getElementById('uploadDialog');
    if (uploadDialog) {
      uploadDialog.style.display = 'none';
    }
    else{
      console.error("Element with id 'uploadDialog' not found");
    }
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
    this.metadataFields = [{
      keyName: '', value: '',
      id: 0 ,
      documentId: 0
    }];
    this.showMetadataFields=false;
    this.getAllDocs();
}
 
  closeShareDialog() {
    const shareDialog = document.getElementById('shareDialog');
    if (shareDialog) {
      shareDialog.style.display = 'none';
    } else {
      console.error("Element with id 'shareDialog' not found");
    }
  }
  openShareDialog(id:number){
    this.showShareDialog=true;
    this.userService.getAllUsers().subscribe((response)=>{
      this.users=response;
    })
    this.idDoc=id;
     
  }
 
shareDocument(documentId:number){
this.showShareDialog=false;
this.autorityService.grantAutority(new Autorisation(this.userId,documentId,this.accessRight)).subscribe((response)=>{
console.log("success");
})
}
download(documentId:number){
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, ''); // Format: HHMMSS
const fileName = `${formattedDate}_${formattedTime}_file${documentId}.docx`;
this.documentService.downloadDocument(documentId,fileName);
}
filterList(){
this.documentService.filterDocs(new Document(0,this.nom,this.type,this.date,'')).subscribe((response)=>{
  this.docs=response;
})
}

}