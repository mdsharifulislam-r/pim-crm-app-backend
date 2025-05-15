import { model, Schema } from "mongoose";
import {  USER_ROLES } from "../../../enums/user";
import { IUser, UserModal } from "./user.interface";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import { TIME_ZONE } from "../../../enums/timeZone";
import { TeamRole } from "../../../enums/teamRole";

const userSchema = new Schema<IUser, UserModal>(
    {
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
            select: 0,
            minlength: 8,
        },
        profile: {
            type: String,
            default: 'https://res.cloudinary.com/dzo4husae/image/upload/v1733459922/zfyfbvwgfgshmahyvfyk.png',
        },
        verified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            required: true,
        },
        authorizer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        team_role: {
            type: String,
            enum: Object.values(TeamRole),
            required:false,
            default:TeamRole.MEMBER
        },
        timezone: {
            type: String,
            default: TIME_ZONE.UTC
        },
        authentication: {
            type: {
                isResetPassword: {
                    type: Boolean,
                    default: false,
                },
                oneTimeCode: {
                    type: Number,
                    default: null,
                },
                expireAt: {
                    type: Date,
                    default: null,
                },
            },
            select: 0
        }
    },
    {
        timestamps: true
    }
)
  
//is match password
userSchema.statics.isMatchPassword = async ( password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};
  
//check user
userSchema.pre('save', async function (next) {
    //check user
    const isExist = await User.findOne({ email: this.email });
    if (isExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exist!');
    }
  
    //password hash
    this.password = await bcrypt.hash( this.password, Number(config.bcrypt_salt_rounds));
    next();
});
export const User = model<IUser, UserModal>("User", userSchema)