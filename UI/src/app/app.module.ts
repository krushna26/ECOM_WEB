import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RetailerhomeComponent } from './retailerhome/retailerhome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RetailerhomeComponent,
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
