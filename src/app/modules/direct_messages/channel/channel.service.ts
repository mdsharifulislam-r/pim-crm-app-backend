import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../query/QueryBuilder";
import { Channel } from "./channel.model";
import { IChannel } from "./chennel.interface";
import { ActivityService } from "../../activity/activity.service";
import { ACTIVITY_STATUS } from "../../../../enums/activity";
import { createActivity } from "../../../../helpers/activityHelper";

const createChannelToDB = async (payload: IChannel,user:JwtPayload): Promise<IChannel | null> => {
    payload.creator = user.id;
    payload.participants =payload?.participants?.length? [user.id,...payload.participants] : [user.id];
    const result = await Channel.create(payload);
    await createActivity({
        title: `New Channel Created`,
        status: ACTIVITY_STATUS.INFO,
        todos:[{
            title:`created a new channel name ${payload.name}`,
            status: ACTIVITY_STATUS.INFO
        }],
        for:"global",
        user:user.id
    })
    return result;
};
const retrieveChannelsFromDB = async (query:Record<string,any>,user:JwtPayload) => {
    const result = new QueryBuilder(Channel.find({status:"active",participants:{
        $in:[user.id]
    }}), query).paginate().sort().search(['name'])
    const channels = await result.modelQuery.populate(['creator','participants'],'firstName lastName image').lean()
    const paginationInfo = await result.getPaginationInfo();
    return {
        channels,
        pagination: paginationInfo
    };
};

const updateChannelToDB = async (id: string, payload: Partial<IChannel>) => {
    const isExist = await Channel.findById(id);
    if (!isExist) {
        throw new Error('Channel not found');
    }
    const result = await Channel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteChannelFromDB = async (id: string) => {
    const result = await Channel.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
    return result;
};

const addMemberToChannel = async (channelId: string, userId: string,user:JwtPayload) => {
    const channel = await Channel.findById(channelId).lean()
    if (!channel) {
        throw new Error('Channel not found');
    }
    if(!channel.participants?.map(item=>item.toString()).includes(user.id)) {
        throw new Error('You are not a member of this channel');
    }
    if (channel.participants.map(item=>item.toString()).includes(userId)) {
        throw new Error('User is already a member of the channel');
    }
   const result = await Channel.findByIdAndUpdate(channelId, { $push: { participants: userId } }, { new: true });

   return result;

};

export const ChannelService = {
    createChannelToDB,
    retrieveChannelsFromDB,
    updateChannelToDB,
    deleteChannelFromDB,
    addMemberToChannel
};
