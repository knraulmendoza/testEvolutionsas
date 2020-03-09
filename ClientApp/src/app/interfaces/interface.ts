export interface IUser {
    id: number;
    username: string;
    password: string;
    state?: number;
    roleid: number;
    role?:IRole
}

export interface IPerson {
    id: number;
    firstName: string;
    secondName?: string;
    firstLastName: string;
    secondLastName: string;
    userid: number;
    user: IUser;
}

export interface IRole{
    id: number;
    name: string;
    description?: string;
    state:number;
}
