import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../../errors/ApiErrors";
import { Case } from "../../../case/case.model";
import { IUser } from "../../../user/user.interface";
import { IDamage } from "./damage.interface";
import { Provider } from "../provider.model";
import { Damage } from "./damage.model";
import { caseAuthorized } from "../../../../../util/caseAuthorized";
import { JwtPayload } from "jsonwebtoken";

const createDamage = async (payload: IDamage, user: JwtPayload): Promise<IDamage> => {
    const {provider: providerId } = payload;
    

    const providerData = await Provider.findById(providerId);
    if (!providerData) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Provider not found");
    }
    await caseAuthorized(providerData.case, user.id);
    const result = await Damage.create(payload);
    return result;
};

export const DamagesService = {
    createDamage,
};