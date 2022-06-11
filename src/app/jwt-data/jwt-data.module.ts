import { roles } from "./roles";
import { tutorCurso } from "./tutorCurso";
import { coordinadorEtapa } from "./coordinadorEtapa";

export interface JwtDataModule {
  nombre:String;
  role: Array<roles>;
  tutorCurso:tutorCurso;
  coordinadorEtapa:coordinadorEtapa;
}
