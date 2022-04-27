import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import {NavbarMovilComponent} from "./componets/shared/navbar-movil/navbar-movil.component";
import {NavbarComponent} from "./componets/shared/navbar/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FooterComponent} from "./componets/shared/footer/footer.component";
import {FooterMovilComponent} from "./componets/shared/footer-movil/footer-movil.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { ActividadesComponent } from './componets/actividades/actividades.component';
import { ActividadComponent } from './componets/actividad/actividad.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarMovilComponent,
    NavbarComponent,
    FooterComponent,
    FooterMovilComponent,
    ActividadesComponent,
    ActividadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
