import { Model, Types } from 'mongoose';
import {  USER_ROLES } from '../../../enums/user';
import { TIME_ZONE } from '../../../enums/timeZone';
import { TeamRole } from '../../../enums/teamRole';

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
    notify?: boolean;
    authorizer?: Types.ObjectId;
    role: USER_ROLES;
    profile: string;
    verified: boolean;
    authentication?: IAuthenticationProps;
    timezone?: TIME_ZONE;
    team_role:TeamRole
}

export type UserModal = {
    isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;