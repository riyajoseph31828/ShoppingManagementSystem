import { Role } from "./role";

export interface User {
    id:number;
    name:string;
    email:string;
    password:string;
    dateOfBirth:Date;
    role:Role;
}
