import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ActividadesComponent} from "./components/actividades/actividades.component";
import {ActividadComponent} from "./components/actividad/actividad.component";
import {AdministrarComponent} from "./components/administrar/administrar.component";
import { AuthGuard } from './components/shared/auth.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes =
[
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    { path: 'actividades/:id', component:ActividadesComponent, canActivate:[AuthGuard]},
    { path: 'actividad/:id', component:ActividadComponent, canActivate:[AuthGuard]},
    { path: 'administrar/:apartado', component:AdministrarComponent, canActivate:[AuthGuard], data: {rol: ["Coordinador"]}},
    { path: 'privacy', component:PrivacyPolicyComponent, canActivate:[AuthGuard]},


    { path: '404', component:PageNotFoundComponent},

    { path: '**', pathMatch: 'full', redirectTo: "404" },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
