import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// import { RetailerhomeComponent } from './retailerhome/retailerhome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoPageComponentComponent } from './no-page-component/no-page-component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyComponent } from './buy/buy.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoPageComponentComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    UserhomeComponent,
    ForgotpasswordComponent,
    SignupComponent,
    CartComponent,
    ProductDetailsComponent,
    BuyComponent,
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
