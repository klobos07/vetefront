// tslint:disable-next-line: class-name
interface _CitaUser {
    _id: string;
    motivo: string;
    observaciones: string;
    peso: string;
    tratamiento: string;
    horaCita: string;
    fechCita: string;
    usuario: string;
    mascota: string;
    medico: string;
  }
  
  
  
  export class Cita {
      constructor(
        public motivo?: string,
        public observaciones?: string,
        public peso?: string,
        public tratamiento?: string,
        public horaCita?: string,
        public fechCita?: string,
        public usuario?: string,
        public mascota?: string,
        public medico?: string,
        public _id?: string
    ) {}
  }