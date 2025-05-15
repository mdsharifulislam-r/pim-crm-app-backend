import QueryBuilder from "../../query/QueryBuilder";
import { IActivity } from "./activity.interface";
import { Activity } from "./activity.model";

const createAcrivityToDB = async (payload: IActivity): Promise<IActivity | null> => {
    const result = (await Activity.create(payload)).populate('user');
    return result;
};
const retrieveActivitiesFromDB = async (query: Record<string, any>) => {
    const result = new QueryBuilder(Activity.find(query?.chatId?{chatId:query.chatId}:{}), query).paginate().sort()
    const activities = await result.modelQuery.populate('user').lean();
    const paginationInfo = await result.getPaginationInfo();
    return {
        activities,
        pagination: paginationInfo
    };
};

export const ActivityService = {
    createAcrivityToDB,
    retrieveActivitiesFromDB
};