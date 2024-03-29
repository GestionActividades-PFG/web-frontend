import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {NavbarMovilComponent} from "./components/shared/navbar-movil/navbar-movil.component";
import {NavbarComponent} from "./components/shared/navbar/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FooterComponent} from "./components/shared/footer/footer.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { AdministrarComponent } from './components/administrar/administrar.component';

import {
  DialogoConfirmacionBorradoComponent
} from "./components/shared/dialogo-confirmacion-borrado/dialogo-confirmacion-borrado.component";

import {MatSelectModule} from "@angular/material/select";
import {
  DialogoFormularioMomentoEditarComponent
} from "./components/shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component";
import {
  DialogoFormularioMomentoAltaComponent
} from "./components/shared/dialogo-formulario-momento-alta/dialogo-formulario-momento-alta.component";
import {
  DialogoFormularioActividadEditarComponent
} from "./components/shared/dialogo-formulario-actividad-editar/dialogo-formulario-actividad-editar.component";
import {
  DialogoFormularioActividadAltaComponent
} from "./components/shared/dialogo-formulario-actividad-alta/dialogo-formulario-actividad-alta.component";

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ToastComponent} from "./components/shared/toast/toast.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  DialogoFormularioInscripcionComponent
} from "./components/shared/dialogo-formulario-inscripcion/dialogo-formulario-inscripcion.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarMovilComponent,
    NavbarComponent,
    FooterComponent,
    ActividadesComponent,
    ActividadComponent,
    AdministrarComponent,
    DialogoConfirmacionBorradoComponent,
    DialogoFormularioMomentoEditarComponent,
    DialogoFormularioMomentoAltaComponent,
    DialogoFormularioActividadEditarComponent,
    DialogoFormularioActividadAltaComponent,
    ToastComponent,
    PrivacyPolicyComponent,
    LoadingComponent,
    DialogoFormularioInscripcionComponent,
    PageNotFoundComponent,
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
      MatGridListModule,
      MatSelectModule,
      MatTooltipModule,
      MatInputModule,
      MatDatepickerModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      MatButtonModule,
      MatMenuModule,
      NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
