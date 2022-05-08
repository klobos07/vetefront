// tslint:disable-next-line: class-name
interface _Mascota {
    _id: string;
    nombreowner: string;
    telefono: string;
    nombre: string;
    edad: number;
    peso: number;
    fechanac: string;
    observaciones: string;
    sexo: string;
    usuario: string;
    raza: string;
    especie: string;
}

export class Mascota {
    constructor(
        public nombreowner: string,
        public telefono: string,
        public nombre: string,
        public edad: number,
        public peso: number,
        public fechanac: string,
        public observaciones: string,
        public sexo: string,
        public usuario: string,
        public raza: string,
        public especie: string,
        public _id?: string,
    ) {}
}