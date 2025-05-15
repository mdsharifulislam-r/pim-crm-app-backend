import { USER_ROLES } from "../enums/user";

export type ICreateAccount = {
    name: string;
    email: string;
    otp: number;
};

export type IAddTeamMember = {
    name: string;
    email: string;
    password: string;
    role: USER_ROLES;
};
  
export type IResetPassword = {
    email: string;
    otp: number;
};