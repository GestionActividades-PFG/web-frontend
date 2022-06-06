import { roles } from "./roles";
import { tutorCurso } from "./tutorCurso";

export interface JwtDataModule { 
  nombre:String; 
  role: Array<roles>;
  tutorCurso:tutorCurso; 
}
