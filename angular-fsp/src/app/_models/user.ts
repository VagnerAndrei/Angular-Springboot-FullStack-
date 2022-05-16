interface IUser{
    email: string;
    senha: string;
}

export class User {

    email!: string;
    senha!: string;

    constructor(params:IUser){
        Object.assign(this, params)
    }

}
