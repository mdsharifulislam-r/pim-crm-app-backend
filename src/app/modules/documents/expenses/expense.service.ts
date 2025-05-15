import { JwtPayload } from "jsonwebtoken";
import { IExpense } from "./expense.interface";
import { caseAuthorized } from "../../../../util/caseAuthorized";
import { Expense } from "./expense.model";
import QueryBuilder from "../../../query/QueryBuilder";

const createExpense = async (payload:IExpense,user:JwtPayload) => {
    payload.authorizer=user.id;
    await caseAuthorized(payload.case,user.id)
    const result = await Expense.create(payload);
    return result;
};

const getExpensesByCase = async (caseId:string,query:Record<string,unknown>) => {
    const result = new QueryBuilder(Expense.find({case:caseId}),query).search(["type","date"]).sort().paginate()
    const paginationResult = await result.getPaginationInfo();
    const data = await result.modelQuery.populate("authorizer","firstName lastName").lean()
    return {
        meta:paginationResult,
        data
    }
};
export const ExpenseService = {
    createExpense,
    getExpensesByCase
}
