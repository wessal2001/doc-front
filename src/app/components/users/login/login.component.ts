import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  username!: string;
  password!: string;
  email!: string;

  constructor(private authService: AuthService,private router:Router) { }

  public login() {
      this.authService.login(this.username, this.password)
          .subscribe(
              response => {
                console.log(response);
                  this.router.navigate(['/docs'],{ queryParams: { userId: response.idUser }});
              },
              error => {
                  this.router.navigate(['/error']);
              }
          );
      
  } 
  public register() {
    
    this.authService.register({"username":this.username,"password":this.password,"email":this.email})
        .subscribe(
            response => {
              this.username='';
              this.email='';
              this.password='';
            },
            error => {
                this.router.navigate(['/error']);
            }
        );
    
} 
}
