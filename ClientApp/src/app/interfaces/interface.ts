export interface IUser {
    id: number;
    username: string;
    password: string;
    state?: number;
}

export interface IPerson {
    id: number;
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name: string;
    user_id: number;
    user: IUser;
}
