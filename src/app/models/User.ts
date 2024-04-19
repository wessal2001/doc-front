 export class  User{
    idUser!:number;
   username!:string;
   password!:string;
   email!:string;
   constructor(
    idUser:number,
    username: string,
    password: string,
    email:string
   
) {
    this.idUser=idUser
    this.username = username;
    this.password = password;
    this.email=email;
}
 }
