import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../helpers/QueryBuilder';
import { FilterQuery } from 'mongoose';
import { checkMongooseIDValidation } from '../../../util/checkMongooseIDValidation';
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createTeamMemberInDB = async (payload: IUser): Promise<IUser> => {

    const createTeam = await User.create(payload);
    if (!createTeam) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Team Member');
    }

    const values = {
        name: payload.firstName + ' ' + createTeam.lastName,
        email: payload.email,
        password: payload.password,
        permissions: payload.permissions || []
    };

    if (payload.do == true) {
        const createAddTeamMemberTemplate = emailTemplate.addTeamMember(values);
        emailHelper.sendEmail(createAddTeamMemberTemplate);
    }

    return createTeam;
};

const retrievedTeamMemberFromDB = async (user: JwtPayload, query: FilterQuery<any>): Promise<{ teams: IUser[], pagination: any }> => {
    const teamQuery = new QueryBuilder(
        User.find({ authorizer: user.id }).sort({ createdAt: -1 }),
        query
    ).search(['firstName', 'lastName', 'email', 'phone']).paginate();
    
    const teams = await teamQuery.queryModel.lean().exec();
    const pagination = await teamQuery.getPaginationInfo();
    return { teams, pagination };
};

const updateTeamMemberInDB = async (id: string, payload: IUser): Promise<IUser> => {
    checkMongooseIDValidation(id, "Team Member");
    const updateTeam = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!updateTeam) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update Team Member');
    }
    return updateTeam;
};

const deleteTeamMemberFromDB = async (id: string): Promise<void> => {
    checkMongooseIDValidation(id, "Team Member");
    const isExistTeam = await User.findByIdAndDelete(id);
    if (!isExistTeam) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Team Member doesn't exist!");
    }
    return;
};

export const TeamService = {
    createTeamMemberInDB,
    retrievedTeamMemberFromDB,
    updateTeamMemberInDB,
    deleteTeamMemberFromDB
};