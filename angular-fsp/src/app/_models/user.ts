export interface IUserLogin {
    email: string;
    senha: string;
}

export interface IUserRegister {
    email: string;
    senha: string;
    nome: string;
}

export class User {

    id:number
    email!: string;
    senha!: string;
    nome: string;
    perfis: string[];
    foto:boolean;

    constructor(params: IUserRegister) {
        Object.assign(this, params)
    }

}
