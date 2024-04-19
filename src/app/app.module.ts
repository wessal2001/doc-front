import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocComponent } from './components/docs/doc/doc.component';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './components/users/login/login.component';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast'
import {DividerModule} from 'primeng/divider'
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from "primeng/password";
import { ErrorComponent } from './components/error/error.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DocComponent,
    LoginComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule ,
    ToastModule,
    DividerModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    PasswordModule,
    HttpClientModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
