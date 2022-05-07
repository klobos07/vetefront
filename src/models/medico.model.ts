// tslint:disable-next-line: class-name
interface _MedicoUser {
  _id: string;
  nombre: string;
  telefono: string;
  img: string;
}

export class Medico {
    constructor(
      public nombre: string,
      public telefono: string,
      // tslint:disable-next-line: variable-name
      public _id?: string,
      public img?: string,
      public usuario?: _MedicoUser,

  ) {}
}
