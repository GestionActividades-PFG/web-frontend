import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./componets/home/home.component";
import {ActividadesComponent} from "./componets/actividades/actividades.component";
import {ActividadComponent} from "./componets/actividad/actividad.component";
import {AdministrarComponent} from "./componets/administrar/administrar.component";

export const routes: Routes =
  [
    { path: 'home', component:HomeComponent},
    { path: 'actividades/:id', component:ActividadesComponent},
    { path: 'actividad/:id', component:ActividadComponent},
    { path: 'administrar/:apartado', component:AdministrarComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
