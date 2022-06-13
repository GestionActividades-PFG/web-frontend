import { roles } from "./roles";
import { tutorCurso } from "./tutorCurso";
import { coordinadorEtapa } from "./coordinadorEtapa";

/**
 * @file : jwt-data.module.ts
 * aaaaaaaaaaaaaaaaaaaaaaa.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export interface JwtDataModule {
  nombre:String;
  role: Array<roles>;
  tutorCurso:tutorCurso;
  coordinadorEtapa:coordinadorEtapa;
}
