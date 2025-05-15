import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { ExpenseValidation } from './expense.validation';
import { ExpenseController } from './expense.controller';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        validateRequest(ExpenseValidation.createExpenseZodSchema),
        ExpenseController.createExpense
    )
    .get(auth(),ExpenseController.getAllExpense)

export const ExpenseRoutes = router;