import { Timestamp } from "firebase/firestore";

export interface Product{
    descripcion: string,
    email: string,
    telefono: number,
    price: number,
    name: string,
    tipo: string,
    id: string,
    cantidad: number,
    estado: string,
    fechaCreacion: Timestamp,
}