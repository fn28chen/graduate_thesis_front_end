export interface IUserLogin {
    username: string;
    password: string;
}

export interface IAccountInfo {
    user?: IUserLogin;
    accessToken?: string;
    refreshToken?: string;
}

export interface IUser {
    fullName: string;
    email: string;
}