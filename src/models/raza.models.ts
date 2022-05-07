

// tslint:disable-next-line: class-name
interface _RazaUser {
  _id: string;
  nombre: string;
  descripcion: string;
}



export class Raza {
    constructor(
      public nombre: string,
      public descripcion: string,
      // tslint:disable-next-line: variable-name
      public _id?: string,
      public usuario?: _RazaUser,

  ) {}
}
