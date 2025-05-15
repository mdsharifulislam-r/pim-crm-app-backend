import { Model, Types } from "mongoose";

export type IExpense = {
    case: Types.ObjectId;
    type: string;
    amount: number;
    date: string;
    authorizer?: Types.ObjectId;
};

export type ExpenseModel = Model<IExpense, Record<string, unknown>>;