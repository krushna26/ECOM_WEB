import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RetailerhomeComponent } from './retailerhome/retailerhome.component';
import { NoPageComponentComponent } from './no-page-component/no-page-component.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'retailhome', component: RetailerhomeComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'userhome', component: UserhomeComponent },
  {path:'forgot-password',component:ForgotpasswordComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  { path: '**', component: NoPageComponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
