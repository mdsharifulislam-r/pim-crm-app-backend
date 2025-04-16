import { PERMISSION } from "../enums/user";

export type ICreateAccount = {
    name: string;
    email: string;
    otp: number;
};

export type IAddTeamMember = {
    name: string;
    email: string;
    password: string;
    permissions: PERMISSION[];
};
  
export type IResetPassword = {
    email: string;
    otp: number;
};