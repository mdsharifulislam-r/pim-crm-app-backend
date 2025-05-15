import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { ExpenseService } from "./expense.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createExpense = catchAsync(async (req:Request, res:Response) => {
    const user = req.user;
  const result = await ExpenseService.createExpense(req.body,user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Expense created successfully",
    data: result,
  });
}
)

const getAllExpense = catchAsync(async (req:Request, res:Response) => {
    const query= req.query
    const result = await ExpenseService.getExpensesByCase(query.id as string,query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Expenses fetched successfully",
        data: result.data,
        pagination: result.meta
    });
})
export const ExpenseController = {
    createExpense,
    getAllExpense
}