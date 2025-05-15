import { JwtPayload } from "jsonwebtoken";
import { IMessage } from "./message.interface";
import { Message } from "./message.model";
import { sendMessages } from "../../../../helpers/messageHelper";
import QueryBuilder from "../../../query/QueryBuilder";
import { cloudinaryHelper } from "../../../../helpers/cloudinaryHelper";
import ApiError from "../../../../errors/ApiErrors";

const createMessageToDB = async (payload: IMessage,user:JwtPayload)=>{
    if(!payload.content && !payload.file){
        throw new ApiError(400,'Content or file is required');
    }
    let isLink = false;
    if(payload.content){
        const linkRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/g;
        const links = payload.content.match(linkRegex);
        if(links){
            isLink = true;
        }
    }

    payload.isLink = isLink;
    payload.sender = user.id;
    if(payload.file){
        const data = await cloudinaryHelper.uploadFile(payload.file as any);
        payload.file = data
    }
    const result = await Message.create(payload);
    sendMessages<IMessage>(payload.channel,result);
    return result;
}

const retriveMessagesFromDB = async (id:string,query:Record<string,any>)=>{
    const result = new QueryBuilder(Message.find(!query.item?{channel:id}:query.item=="file"?{channel:id,file:{
        $exists:true
    }}:{channel:id,isLink:true}),query).paginate()
    const paginationInfo = await result.getPaginationInfo()
    const messages = await result.modelQuery.populate('sender','firstName lastName image').lean()
    return {paginationInfo,messages}
}


export const MessageService = {
    createMessageToDB,
    retriveMessagesFromDB
}