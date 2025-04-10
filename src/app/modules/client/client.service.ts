import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { IClient } from './client.interface';
import { Client } from './client.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../helpers/QueryBuilder';
import { FilterQuery } from 'mongoose';
import { checkMongooseIDValidation } from '../../../util/checkMongooseIDValidation';

const createClientInDB = async (payload: IClient): Promise<IClient> => {
    const client = await Client.create(payload);
    if (!client)
        throw new ApiError(StatusCodes.EXPECTATION_FAILED, 'Failed to create client');

    return client;
};

const retrieveClientsFromDB = async (user: JwtPayload, query: FilterQuery<any>): Promise<{ clients: IClient, pagination: any }> => {

    const clientQuery = new QueryBuilder(
        Client.find({ authorizer: user._id }),
        query
    ).search(['name', 'email', 'phone']).filter().sort().paginate();

    const clients = await clientQuery.queryModel.lean().exec();
    const pagination = await clientQuery.getPaginationInfo();

    return { clients, pagination };
}


const deleteClientFromDB = async (id: string): Promise<IClient> => {
    checkMongooseIDValidation(id, "Client");

    const client = await Client.findByIdAndDelete(id);
    if (!client)
        throw new ApiError(StatusCodes.EXPECTATION_FAILED, 'Failed to delete client');

    return client;
}


export const ClientService = {
    createClientInDB,
    retrieveClientsFromDB,
    deleteClientFromDB
};