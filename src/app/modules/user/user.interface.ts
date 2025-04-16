import { Model, Types } from 'mongoose';
import { PERMISSION, USER_ROLES } from '../../../enums/user';

interface IAuthenticationProps {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
}

export type IUser = {
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    phone: string;
    password: string;
    permissions?: PERMISSION[];
    do?: boolean;
    authorizer?: Types.ObjectId;
    role: USER_ROLES;
    profile: string;
    verified: boolean;
    authentication?: IAuthenticationProps;
}

export type UserModal = {
    isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;