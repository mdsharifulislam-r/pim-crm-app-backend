import mongoose, { Schema } from "mongoose";
import { ExpenseModel, IExpense } from "./expense.interface";

const expenseSchema = new Schema<IExpense, ExpenseModel>(
    {
        case: {
            type: Schema.Types.ObjectId,
            ref: "Case",
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        authorizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    }
);

export const Expense = mongoose.model<IExpense, ExpenseModel>("Expense", expenseSchema);