import { Generic } from './generic';
export class Usuario  implements Generic {
    id?: number = 0;
    _id?: string = '';
    uid: string = '';
    correo: string = '';
    password: string = '';
    nombre: string = '';
    rol: string = '';
    img: string = '';
    estado: boolean = false;
    google: boolean = false;
    roles: string[] = [];
  }
  