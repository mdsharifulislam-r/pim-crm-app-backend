import { Model, Types } from "mongoose"
import { DAMAGE_TYPE } from "../../../../../enums/damage"

export type IDamage = {
    type:DAMAGE_TYPE,
    description:string,
    amount:number,
    case:Types.ObjectId,
    provider:Types.ObjectId
}

export type DamageModel = Model<IDamage>