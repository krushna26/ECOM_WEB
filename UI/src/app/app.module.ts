import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RetailerhomeComponent } from './retailerhome/retailerhome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoPageComponentComponent } from './no-page-component/no-page-component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RetailerhomeComponent,
    NoPageComponentComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    UserhomeComponent,
    ForgotpasswordComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Use HttpClientModule instead of HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
