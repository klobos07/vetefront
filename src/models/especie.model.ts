// tslint:disable-next-line: class-name
interface _EspecieUser {
  _id: string;
  nombre: string;
  descripcion: string;
}



export class Especie {
    constructor(
      public nombre: string,
      public descripcion: string,
      // tslint:disable-next-line: variable-name
      public _id?: string,
      public usuario?: _EspecieUser,

  ) {}
}
