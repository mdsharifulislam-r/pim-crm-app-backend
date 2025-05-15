import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import { JwtPayload } from 'jsonwebtoken';
import { FilterQuery } from 'mongoose';
import { checkMongooseIDValidation } from '../../../util/checkMongooseIDValidation';
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import config from "../../../config";
import { TeamRole } from "../../../enums/teamRole";
import QueryBuilder from "../../query/QueryBuilder";
import { createActivity } from "../../../helpers/activityHelper";
import { ACTIVITY_STATUS } from "../../../enums/activity";

const createTeamMemberInDB = async (payload: IUser): Promise<IUser> => {
    payload.password = config.admin.password!;
    const createTeam = await User.create(payload);
    if (!createTeam) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Team Member');
    }

    const values = {
        name: payload.firstName + ' ' + createTeam.lastName,
        email: payload.email,
        password: config.admin.password!,
        role: payload.role,
        verified: false,
    };

    if (payload.notify == true) {
        const createAddTeamMemberTemplate = emailTemplate.addTeamMember(values);
        emailHelper.sendEmail(createAddTeamMemberTemplate);
    }

    await createActivity(
        {
            title: 'Team Member Added',
            status:ACTIVITY_STATUS.SUCCESS,
            todos: [
                {
                    title: `Team Member ${payload.firstName} ${payload.lastName} has been added.`,
                    status: ACTIVITY_STATUS.SUCCESS,
                },
            ],
            user:payload.authorizer,
        }
    )

    return createTeam;
};

const retrievedTeamMemberFromDB = async (id:string, query: FilterQuery<any>) => {
    const teamQuery = new QueryBuilder(
        User.find({ $or:[
            { _id:id },
            { authorizer: id },
        ] }).sort({ createdAt: -1 }),
        query
    ).search(['firstName', 'lastName', 'email', 'phone']).paginate();
    
    const teams = await teamQuery.modelQuery.lean().exec();
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

const deleteTeamMemberFromDB = async (id: string,user:JwtPayload): Promise<void> => {
    checkMongooseIDValidation(id, "Team Member");
    const isExistTeam = await User.findByIdAndDelete(id);
    if (!isExistTeam) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Team Member doesn't exist!");
    }
    const userData = await User.findById(user.id);
    await createActivity(
        {
            title: 'Team Member Deleted',
            status:ACTIVITY_STATUS.ERROR,
            todos: [
                {
                    title: `Team Member ${userData?.firstName} ${userData?.lastName} has deleted a team member.`,
                    status: ACTIVITY_STATUS.SUCCESS,
                },
                {
                    title: `Team Member ${isExistTeam.firstName} ${isExistTeam.lastName} has been deleted`,
                    status: ACTIVITY_STATUS.ERROR,
                },
            ],
            user:user.id,
        }
    )
    return;
};

const retrieveTeams = async (): Promise<IUser[]> => {
    const teams = await User.find({team_role:TeamRole.AUTHORIZER}).select('-password').populate('authorizer', '-password');
    return teams;
}
export const TeamService = {
    createTeamMemberInDB,
    retrievedTeamMemberFromDB,
    updateTeamMemberInDB,
    deleteTeamMemberFromDB,
    retrieveTeams
};