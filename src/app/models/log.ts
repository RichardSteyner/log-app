import { Generic } from './generic';
export class Log implements Generic {

    id?: number = 0;
    _id?: string = '';
    titulo : string = '';
    tipo: string = '';
    detalleTipo: string = '';
    descripcion: string = '';
    solucion: string = '';
    codigoClave: string = '';

    /*constructor(id: string, titulo: string, tipo: string, detalleTipo: string, descripcion: string, solucion: string, codigoClave: string) {
        this._id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.detalleTipo = detalleTipo;
        this.descripcion = descripcion;
        this.solucion = solucion;
        this.codigoClave = codigoClave;
    }*/

    public toString = () : string => {
        //return `Foo (id: ${this.id})`;
        return this.titulo + ' ' + this.detalleTipo;
    }

}
