import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { TaskValidation } from './task.validation';
import { TaskController } from './task.controller';

const router = express.Router();

router.route('/')
.post(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    validateRequest(TaskValidation.createTaskZodSchema),
    TaskController.createTask
)
.get(
    auth(),
    TaskController.getAllTasks
)

router.route('/month-task')
.get(
    auth(),
    TaskController.taskDates
)

router.route('/:id')
.patch(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    validateRequest(TaskValidation.changeTaskStatusZodSchema),
    TaskController.changeStatus
)
.delete(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    TaskController.deleteTask
)

router.route('/single-task/:id')
.get(
    auth(),
    TaskController.getSingleTask
)

export const TaskRoutes=router;