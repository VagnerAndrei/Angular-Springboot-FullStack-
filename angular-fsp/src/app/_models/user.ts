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

    email!: string;
    senha!: string;
    nome: string;
    perfis: string[];

    constructor(params: IUserRegister) {
        Object.assign(this, params)
    }

}
