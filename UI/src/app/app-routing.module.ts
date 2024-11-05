import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoPageComponentComponent } from './no-page-component/no-page-component.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { BuyComponent } from './buy/buy.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'edit-profile/:id',component: EditprofileComponent,},
  { path: 'userdetails/:id', component: UserprofileComponent },
  {path:'checkout',component:CheckoutComponent},
  { path: '**', component: NoPageComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
