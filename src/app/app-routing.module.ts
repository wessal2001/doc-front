import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { DocComponent } from './components/docs/doc/doc.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'error',component:ErrorComponent
  },
  {
    path:'docs',component:DocComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
 
}
