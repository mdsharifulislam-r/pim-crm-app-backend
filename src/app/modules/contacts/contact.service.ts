import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { IClient } from './contact.interface';
import { Client } from './contact.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../helpers/QueryBuilder';
import { FilterQuery } from 'mongoose';
import { checkMongooseIDValidation } from '../../../util/checkMongooseIDValidation';
import { cloudinaryHelper } from '../../../helpers/cloudinaryHelper';
import { createActivity } from '../../../helpers/activityHelper';
import { ACTIVITY_STATUS } from '../../../enums/activity';
import { sendNotifations } from '../../../helpers/notifacationHelper';

const createClientInDB = async (payload: IClient): Promise<IClient> => {
    payload.tags = JSON.parse(payload.tags as any);
    const client = await Client.create(payload);
    if (!client)
        throw new ApiError(StatusCodes.EXPECTATION_FAILED, 'Failed to create client');

   await createActivity({
        user:payload.authorizer,
        status:ACTIVITY_STATUS.SUCCESS,
        title: `New Client Added`,
        todos:[
            {
                title:`${client.name} added to client list`,
                status:ACTIVITY_STATUS.SUCCESS
            }
        ],
    })

    await sendNotifations({
        title:`New Client Added`,
        text:`${client.name} added to client list`,
        link:"client",
        type:"general",
        reference:client._id.toString()
    })


    return client;
};

const retrieveClientsFromDB = async (user: JwtPayload, query: FilterQuery<any>): Promise<{ clients: IClient, pagination: any }> => {

    const clientQuery = new QueryBuilder(
        Client.find(),
        query
    ).search(['name', 'email', 'phone']).filter().sort().paginate();

    const clients = await clientQuery.queryModel.lean().exec();
    const pagination = await clientQuery.getPaginationInfo();

    return { clients, pagination };
}


const deleteClientFromDB = async (id: string,user:JwtPayload): Promise<IClient> => {
    checkMongooseIDValidation(id, "Client");

    const client = await Client.findByIdAndDelete(id);
    if (!client)
        throw new ApiError(StatusCodes.EXPECTATION_FAILED, 'Failed to delete client');

    await cloudinaryHelper.deleteFile(client.profile.public_id)

    await createActivity(
        {
            user:user.id,
            status:ACTIVITY_STATUS.ERROR,
            title: `Client Deleted`,
            todos:[
                {
                    title:`${client.name} deleted from client list`,
                    status:ACTIVITY_STATUS.ERROR
                }
            ],
        }
    )

    return client;
}

const getClientFromDB = async (id:string)=>{
    const client = await Client.findById(id).populate('authorizer')
    if(!client){
        throw new ApiError(StatusCodes.NOT_FOUND,'No client found')
    }
    return client
}


export const ClientService = {
    createClientInDB,
    retrieveClientsFromDB,
    deleteClientFromDB,
    getClientFromDB
};