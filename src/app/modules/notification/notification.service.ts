import { JwtPayload } from 'jsonwebtoken';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';
import QueryBuilder from '../../query/QueryBuilder';

const createNotification = async (payload: INotification): Promise<INotification | null> => {
    const result = await Notification.create(payload);
    return result;
};

const getAllNotifications = async (user: JwtPayload,query:Record<string,any>) => {
    const result = new QueryBuilder(Notification.find({receivers:{
        $in:[user.id]
    }}),query).sort().paginate()
    const paginationInfo = await result.getPaginationInfo()
    const data = await result.modelQuery.lean().exec()
    return {
        data:data.map((item:any)=>{
            return {
                ...item,
                read:item.readers?.includes(user.id)
            }
        }),
        paginationInfo
    }
};

const readSingleNotification = async (user: JwtPayload, id: string): Promise<INotification | null> => {
    const result = await Notification.findOneAndUpdate({ _id: id, receivers: { $in: [user.id] },readers:{$nin:[user.id]} }, {$push:{readers:user.id} }, { new: true });
    return result;
};

const readAllNotifications = async (user: JwtPayload) => {
    const result = await Notification.updateMany({ receivers: { $in: [user.id] },readers:{$nin:[user.id]} }, { $push: { readers: user.id } });
    return result;
};

export const NotificationService = {
    createNotification,
    getAllNotifications,
    readSingleNotification,
    readAllNotifications
};