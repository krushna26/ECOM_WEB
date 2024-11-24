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
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { BuyComponent } from './buy/buy.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SummeryComponent } from './summery/summery.component';
import { PaymentComponent } from './payment/payment.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { EditaddressComponent } from './editaddress/editaddress.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoPageComponentComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    ForgotpasswordComponent,
    CartComponent,
    ProductDetailsComponent,
    BuyComponent,
    UserprofileComponent,
    EditprofileComponent,
    CheckoutComponent,
    SummeryComponent,
    PaymentComponent,
    ProgressBarComponent,
    EditaddressComponent,
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
