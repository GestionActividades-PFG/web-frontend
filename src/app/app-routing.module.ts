import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ActividadesComponent} from "./components/actividades/actividades.component";
import {ActividadComponent} from "./components/actividad/actividad.component";
import {AdministrarComponent} from "./components/administrar/administrar.component";
import { AuthGuard } from './components/shared/auth.guard';

export const routes: Routes =
  [
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    { path: 'actividades/:id', component:ActividadesComponent, canActivate:[AuthGuard]},
    { path: 'actividad/:id', component:ActividadComponent, canActivate:[AuthGuard]},
    { path: 'administrar/:apartado', component:AdministrarComponent, canActivate:[AuthGuard]},
    { path: 'login', redirectTo: "/http://localhost"}, // <-- Pruebas
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
